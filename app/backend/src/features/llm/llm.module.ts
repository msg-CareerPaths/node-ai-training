import { Module } from '@nestjs/common';
import { LlmController } from './controllers/llm.controller';

@Module({
    imports: [],
    controllers: [LlmController],
    providers: [],
    exports: []
})
export class LlmModule {}
