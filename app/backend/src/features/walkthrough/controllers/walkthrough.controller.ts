import {
    Controller,
    Get,
    Param,
    Res,
    StreamableFile,
    UseGuards
} from '@nestjs/common';
import type { Response } from 'express';
import { WalkthroughService } from '../services/walkthrough.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Walkthrough')
@Controller('walkthrough')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WalkthroughController {
    constructor(private readonly walkthroughService: WalkthroughService) {}

    @Get('files')
    async listFiles() {
        const files = await this.walkthroughService.listFiles();
        return { files };
    }

    @Get('files/:filename')
    async getFile(
        @Param('filename') filename: string,
        @Res({ passthrough: true }) res: Response
    ) {
        const file = await this.walkthroughService.getFile(filename);
        const stream = this.walkthroughService.createStream(file);

        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `inline; filename="${file.filename}"`
        });

        return new StreamableFile(stream);
    }
}
