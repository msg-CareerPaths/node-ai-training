import {
    SubscribeMessage,
    WebSocketGateway,
    WsResponse
} from '@nestjs/websockets';
import {
    LlmChatMessageDto,
    LlmChatMessagePayload
} from '../dtos/llm-chat-message.dto';
import { map, Observable, of, Subject } from 'rxjs';
import { MessageEntity } from '../../../core/entities/message.entity';
import { LlmChatService } from '../services/llm-chat.service';
import {
    mapMessageEntityToDto,
    mapMessagePayloadDtoToEntity
} from '../utils/mappers/llm-chat.mapper';
import { LlmChatState } from '../types/llm-chat.state';
import { MessageType } from '../../../core/enums/message-type.enum';

@WebSocketGateway({ namespace: 'ws/llm' })
export class LlmChatGateway {
    constructor(private readonly llmChatService: LlmChatService) {}

    @SubscribeMessage('chat')
    onSessionMessage(
        message: LlmChatMessagePayload
    ): Observable<WsResponse<LlmChatMessageDto>> {
        const chatState: LlmChatState = {
            groupId: crypto.randomUUID(),
            messageStream: new Subject<MessageEntity>(),
            infoStream: new Subject<MessageEntity>()
        };
        const payloadEntity = mapMessagePayloadDtoToEntity(message);
        void this.llmChatService.handleChatMessage(payloadEntity, chatState);

        const messageResponse = chatState.messageStream
            .asObservable()
            .pipe(
                map(message =>
                    mapMessageEntityToDto(message, MessageType.Message)
                )
            );
        const infoResponse = chatState.messageStream
            .asObservable()
            .pipe(
                map(message => mapMessageEntityToDto(message, MessageType.Info))
            );
        return of();
    }
}
