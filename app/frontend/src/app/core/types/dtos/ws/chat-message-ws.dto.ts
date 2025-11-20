import { MessageType } from '../../enums/message-type.enum';
import { MessageSender } from '../../enums/message-sender.enum';

export interface ChatMessageDto {
  id: string;
  userId: string;
  groupId: string | null;
  timestamp: string;
  sender: MessageSender;
  content: string;
  complete: boolean;
  messageType: MessageType;
}

export interface ChatMessagePayloadDto {
  userId: string;
  content: string;
}
