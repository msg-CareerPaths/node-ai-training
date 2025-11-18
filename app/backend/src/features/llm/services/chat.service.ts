import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../../core/entities/message.entity';
import { ChatState } from '../types/chat.state';

@Injectable()
export class ChatService {
    async handleChatMessage(
        message: MessageEntity,
        state: ChatState
    ): Promise<void> {
        console.log('Implement me');
    }
}
