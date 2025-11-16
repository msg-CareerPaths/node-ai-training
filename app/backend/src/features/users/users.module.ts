import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
