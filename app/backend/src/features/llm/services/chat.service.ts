import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../../core/entities/message.entity';
import { ChatState } from '../types/chat.state';
import { ChatMessageDto } from '../dtos/chat-message.dto';
import { mapMessageEntityToDto } from '../utils/mappers/chat.mapper';
import { MessageType } from '../../../core/enums/message-type.enum';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {}

    async getMessagesForUser(userId: string): Promise<ChatMessageDto[]> {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .where('"userId" = :userId', { userId })
            .orderBy('message.timestamp', 'ASC')
            .getMany();

        return messages.map(message =>
            mapMessageEntityToDto(message, MessageType.Message)
        );
    }

    async clearMessagesForUser(userId: string): Promise<number> {
        const result = await this.messageRepository
            .createQueryBuilder()
            .delete()
            .from(MessageEntity)
            .where('"userId" = :userId', { userId })
            .execute();

        return result.affected ?? 0;
    }

    async handleChatMessage(
        message: MessageEntity,
        state: ChatState
    ): Promise<void> {
        console.log('Implement me');
    }
}
