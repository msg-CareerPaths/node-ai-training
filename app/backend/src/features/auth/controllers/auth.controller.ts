import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { LoginCredentials } from '../dtos/login-credentials.dto';
import { UserService } from '../../users/services/user.service';
import { User } from '../decorators/user.decorator';
import { UserDto } from '../../users/dtos/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { mapUserEntityToDto } from '../../users/utils/mappers/user.mapper';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import type { AuthUserData } from '../types/jwt.types';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        description: 'The credentials used for authentication',
        type: LoginCredentials
    })
    @ApiOkResponse({
        type: JwtPayloadDto,
        description: 'The authentication was successful.'
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    login(@User() user: AuthUserData): JwtPayloadDto {
        return this.authService.login(user);
    }

    @Post('register')
    @ApiBody({
        description: 'The user create payload.',
        type: CreateUserDto
    })
    @ApiCreatedResponse({
        type: UserDto,
        description: 'The registered user information.'
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid user data payload.'
    })
    async register(@Body() payload: CreateUserDto): Promise<UserDto | null> {
        const retrievedUser = await this.userService.create(payload);
        return mapUserEntityToDto(retrievedUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOkResponse({
        type: UserDto,
        description: 'The currently authenticated user.'
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async getProfile(@User() user: AuthUserData): Promise<UserDto | null> {
        const retrievedUser = await this.userService.findById(user.id);
        return mapUserEntityToDto(retrievedUser);
    }
}
