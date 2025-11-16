import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import {
    mapUserEntitiesToDtos,
    mapUserEntityToDto
} from '../utils/mappers/user.mapper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../../core/enums/user-roles.enum';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'List all users' })
    @ApiOkResponse({
        description: 'Users retrieved',
        type: UserDto,
        isArray: true
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async findAll(): Promise<UserDto[]> {
        const users = await this.userService.findAll();
        return mapUserEntitiesToDtos(users);
    }

    @Get('username/:username')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Get a user by username' })
    @ApiOkResponse({ description: 'User found', type: UserDto })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async findByUsername(
        @Param('username') username: string
    ): Promise<UserDto | null> {
        const user = await this.userService.findByUsername(username);
        return mapUserEntityToDto(user);
    }

    @Get(':id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiOkResponse({ description: 'User found', type: UserDto })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async findById(@Param('id') id: string): Promise<UserDto | null> {
        const user = await this.userService.findById(id);
        return mapUserEntityToDto(user);
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Delete a user by id' })
    @ApiNoContentResponse({ description: 'User deleted' })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(id);
    }
}
