import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlmController } from './controllers/llm.controller';
import { ChatService } from './services/chat.service';
import { MessageEntity } from '../../core/entities/message.entity';
import { ChatController } from './controllers/chat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [LlmController, ChatController],
    providers: [ChatService],
    exports: []
})
export class LlmModule {}
