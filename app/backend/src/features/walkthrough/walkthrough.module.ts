import { Module } from '@nestjs/common';
import { WalkthroughController } from './controllers/walkthrough.controller';
import { WalkthroughService } from './services/walkthrough.service';

@Module({
    controllers: [WalkthroughController],
    providers: [WalkthroughService]
})
export class WalkthroughModule {}
