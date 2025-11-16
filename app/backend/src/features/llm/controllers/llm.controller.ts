import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
    LlmHealthRequestDto,
    LlmHealthResponseDto
} from '../dtos/llm-health.dto';

@ApiBearerAuth()
@Controller('llm')
@ApiTags('LLM')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LlmController {
    @Post('health')
    @ApiOperation({
        summary: 'Test access to your LLM'
    })
    @ApiOkResponse({
        description: 'Health check is okay',
        type: LlmHealthResponseDto
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    healthCheck(@Body() dto: LlmHealthRequestDto): LlmHealthResponseDto {
        return {
            requestPrompt: dto.prompt,
            response: 'Please implement me'
        };
    }
}
