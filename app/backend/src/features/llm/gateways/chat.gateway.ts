import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse
} from '@nestjs/websockets';
import { ChatMessageDto, ChatMessagePayload } from '../dtos/chat-message.dto';
import { last, map, merge, Observable, share, Subject } from 'rxjs';
import { MessageEntity } from '../../../core/entities/message.entity';
import { ChatService } from '../services/chat.service';
import {
    mapMessageEntityToDto,
    mapMessagePayloadDtoToEntity
} from '../utils/mappers/chat.mapper';
import { ChatState } from '../types/chat.state';
import { MessageType } from '../../../core/enums/message-type.enum';

@WebSocketGateway({ namespace: 'ws/llm' })
export class ChatGateway {
    constructor(private readonly llmChatService: ChatService) {}

    @SubscribeMessage('chat')
    onSessionMessage(
        @MessageBody()
        message: ChatMessagePayload
    ): Observable<WsResponse<ChatMessageDto>> {
        const chatState: ChatState = {
            groupId: crypto.randomUUID(),
            messageStream: new Subject<MessageEntity>(),
            infoStream: new Subject<MessageEntity>()
        };
        const payloadEntity = mapMessagePayloadDtoToEntity(message);
        void this.llmChatService.handleChatMessage(payloadEntity, chatState);

        const messageResponse$ = chatState.messageStream.asObservable().pipe(
            map(entity => mapMessageEntityToDto(entity, MessageType.Message)),
            share()
        );

        const messageStream$ = messageResponse$.pipe(
            map(dto => ({
                event: 'chat',
                data: dto
            }))
        );

        const messageCompletion$ = messageResponse$.pipe(
            last(),
            map(lastDto => ({
                event: 'chat',
                data: {
                    ...lastDto,
                    complete: true
                }
            }))
        );

        const infoResponse$ = chatState.infoStream.asObservable().pipe(
            map(entity => mapMessageEntityToDto(entity, MessageType.Info)),
            map(dto => ({
                event: 'chat',
                data: dto
            }))
        );

        return merge(messageStream$, messageCompletion$, infoResponse$);
    }
}
