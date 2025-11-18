import { MessageType } from '../../../core/enums/message-type.enum';
import { MessageSender } from '../../../core/enums/message-sender.enum';

export class ChatMessageDto {
    id: string;
    userId: string;
    groupId: string | null;
    timestamp: string;
    sender: MessageSender;
    content: string;
    complete: boolean;
    messageType: MessageType;
}

export class ChatMessagePayload {
    userId: string;
    content: string;
}
