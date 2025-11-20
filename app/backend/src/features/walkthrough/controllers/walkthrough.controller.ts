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
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiProduces,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { WalkthroughFileListDto } from '../dtos/walkthrough-file-list.dto';

@ApiBearerAuth()
@ApiTags('Walkthrough')
@Controller('walkthrough')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WalkthroughController {
    constructor(private readonly walkthroughService: WalkthroughService) {}

    @Get('files')
    @ApiOperation({
        summary: 'List available walkthrough assets',
        description:
            'Returns the file names that can be downloaded for the walkthrough guidance.'
    })
    @ApiOkResponse({
        description: 'Array of available walkthrough filenames',
        type: WalkthroughFileListDto
    })
    async listFiles() {
        const files = await this.walkthroughService.listFiles();
        return { files };
    }

    @Get('files/:filename')
    @ApiOperation({
        summary: 'Download a walkthrough file',
        description: 'Streams a specific walkthrough asset by filename.'
    })
    @ApiProduces('application/octet-stream')
    @ApiOkResponse({
        description: 'Requested walkthrough file stream',
        content: {
            'application/octet-stream': {
                schema: { type: 'string', format: 'binary' }
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'The requested walkthrough file does not exist.'
    })
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
