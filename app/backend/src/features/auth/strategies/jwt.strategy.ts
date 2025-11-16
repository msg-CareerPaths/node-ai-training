import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUserData, JwtToken } from '../types/jwt.types';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        const secret = configService.get('AUTH_SECRET') as string;
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: JwtToken): Promise<AuthUserData> {
        // extract any additional user info here or additional auth logic
        const retrievedUser = await this.userService.findById(payload.sub);
        return {
            id: retrievedUser.id as string,
            username: retrievedUser.username,
            fullname: retrievedUser.fullname,
            roles: retrievedUser.roles,
            jwt: payload
        };
    }
}
