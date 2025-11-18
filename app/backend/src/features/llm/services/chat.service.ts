import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../../core/entities/message.entity';
import { ChatState } from '../types/chat.state';
import { ChatMessageDto } from '../dtos/chat-message.dto';
import { mapMessageEntityToDto } from '../utils/mappers/chat.mapper';
import { MessageType } from '../../../core/enums/message-type.enum';
import { MessageSender } from '../../../core/enums/message-sender.enum';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {}

    async getMessagesForUser(userId: string): Promise<ChatMessageDto[]> {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.user', 'user')
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
        // Persist the client message
        await this.messageRepository.save(message);

        // Create a mock info message (not persisted)
        const infoMessage: MessageEntity = {
            id: undefined,
            user: message.user,
            groupId: state.groupId,
            timestamp: new Date(),
            sender: MessageSender.Server,
            content: 'Mock info: your message is being processed.'
        };

        state.infoStream.next(infoMessage);

        // Create a mock response from the "server"
        const responseMessage: MessageEntity = {
            id: undefined,
            user: message.user,
            groupId: state.groupId,
            timestamp: new Date(),
            sender: MessageSender.Server,
            content: `Mock response: you said "${message.content}".`
        };

        // Persist the response
        const savedResponse =
            await this.messageRepository.save(responseMessage);

        // Emit the response on the message stream
        state.messageStream.next(savedResponse);

        // Complete streams to signal the end of this chat cycle
        state.infoStream.complete();
        state.messageStream.complete();
    }
}
