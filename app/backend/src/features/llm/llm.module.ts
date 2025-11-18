import { Module } from '@nestjs/common';
import { LlmController } from './controllers/llm.controller';
import { LlmChatService } from './services/llm-chat.service';

@Module({
    imports: [],
    controllers: [LlmController],
    providers: [LlmChatService],
    exports: []
})
export class LlmModule {}
