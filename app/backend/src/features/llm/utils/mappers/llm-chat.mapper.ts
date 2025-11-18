import {
    LlmChatMessageDto,
    LlmChatMessagePayload
} from '../../dtos/llm-chat-message.dto';
import { MessageEntity } from '../../../../core/entities/message.entity';
import { MessageSender } from '../../../../core/enums/message-sender.enum';
import { MessageType } from '../../../../core/enums/message-type.enum';
import { UserEntity } from '../../../../core/entities/user.entity';

export function mapMessagePayloadDtoToEntity(
    dto: LlmChatMessagePayload
): MessageEntity {
    return {
        id: undefined,
        user: { id: dto.userId } as UserEntity,
        timestamp: new Date(),
        sender: MessageSender.Client,
        groupId: null,
        content: dto.content
    };
}

export function mapMessageEntityToDto(
    message: MessageEntity,
    messageType: MessageType
): LlmChatMessageDto {
    return {
        id: message.id as string,
        groupId: message.groupId,
        userId: message.user.id as string,
        timestamp: message.timestamp.toISOString(),
        sender: message.sender,
        content: message.content,
        complete: false,
        messageType
    };
}
