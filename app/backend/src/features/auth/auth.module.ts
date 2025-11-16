import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('AUTH_SECRET'),
                signOptions: { expiresIn: '8h' }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        LocalAuthGuard,
        JwtAuthGuard
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
