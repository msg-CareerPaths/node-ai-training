import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { mapUserEntityToDto } from '../../users/utils/mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { AuthUserData } from '../types/jwt.types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        username: string,
        pass: string
    ): Promise<UserDto | null> {
        const user = await this.usersService.findByUsername(username);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);

            return isMatch ? mapUserEntityToDto(user) : null;
        }
        return null;
    }

    login(user: AuthUserData): JwtPayloadDto {
        // here add any data you require in the token
        const payload = {
            username: user.username,
            fullname: user.fullname,
            sub: user.id,
            roles: user.roles
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
