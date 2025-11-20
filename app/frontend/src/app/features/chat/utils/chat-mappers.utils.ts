import {
  ChatMessageDto,
  ChatMessagePayloadDto,
} from '../../../core/types/dtos/ws/chat-message-ws.dto';
import { MessageType } from '../../../core/types/enums/message-type.enum';
import { MessageSender } from '../../../core/types/enums/message-sender.enum';

export function mapChatPayloadToDto(payload: ChatMessagePayloadDto): ChatMessageDto {
  return {
    id: crypto.randomUUID(),
    userId: payload.userId,
    groupId: null,
    timestamp: new Date().toISOString(),
    content: payload.content,
    messageType: MessageType.Message,
    sender: MessageSender.Client,
    complete: true,
  };
}
