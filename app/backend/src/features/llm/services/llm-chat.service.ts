import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../../core/entities/message.entity';
import { LlmChatState } from '../types/llm-chat.state';

@Injectable()
export class LlmChatService {
    async handleChatMessage(
        message: MessageEntity,
        state: LlmChatState
    ): Promise<void> {
        console.log('Implement me');
    }
}
