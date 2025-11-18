import { Module } from '@nestjs/common';
import { LlmController } from './controllers/llm.controller';
import { ChatService } from './services/chat.service';

@Module({
    imports: [],
    controllers: [LlmController],
    providers: [ChatService],
    exports: []
})
export class LlmModule {}
