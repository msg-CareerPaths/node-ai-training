import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../../core/entities/message.entity';
import { ChatState } from '../types/chat.state';
import { MessageSender } from '../../../core/enums/message-sender.enum';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {}

    async getMessagesForUser(userId: string): Promise<MessageEntity[]> {
        return await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.user', 'user')
            .where('message."userId" = :userId', { userId })
            .orderBy('message.timestamp', 'ASC')
            .getMany();
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
            content: 'Processing.'
        };

        state.infoStream.next(infoMessage);

        // simulate delay
        await this.sleep(2000);

        // Create a mock response from the "server"
        const responseMessage: MessageEntity = {
            id: undefined,
            user: message.user,
            groupId: state.groupId,
            timestamp: new Date(),
            sender: MessageSender.Server,
            content: `You said "${message.content}".`
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

    // TODO: remove in the actual implementation
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
