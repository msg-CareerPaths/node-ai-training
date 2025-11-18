import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ChatService } from '../services/chat.service';
import { ChatMessageDto } from '../dtos/chat-message.dto';
import { User } from '../../auth/decorators/user.decorator';
import type { AuthUserData } from '../../auth/types/jwt.types';

@ApiBearerAuth()
@Controller('llm/chat')
@ApiTags('Chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('messages')
    @ApiOperation({
        summary: 'Get all chat messages for the current user'
    })
    @ApiOkResponse({
        description: 'All messages for the authenticated user.',
        type: ChatMessageDto,
        isArray: true
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    getUserMessages(@User() user: AuthUserData): Promise<ChatMessageDto[]> {
        return this.chatService.getMessagesForUser(user.id);
    }

    @Post('clear')
    @ApiOperation({
        summary: 'Clear all chat messages for the current user'
    })
    @ApiOkResponse({
        description: 'Number of deleted messages for the user.'
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async clearUserMessages(
        @User() user: AuthUserData
    ): Promise<{ deletedCount: number }> {
        const deletedCount = await this.chatService.clearMessagesForUser(
            user.id
        );
        return { deletedCount };
    }
}
