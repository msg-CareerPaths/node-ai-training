import {
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../core/entities/user.entity';
import { CreateUserPayload } from '../types/users.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException(`User with id "${id}" not found`);
        }

        return user;
    }

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { username }
        });

        if (!user) {
            throw new NotFoundException(
                `User with username "${username}" not found`
            );
        }

        return user;
    }

    async create(createUserDto: CreateUserPayload): Promise<UserEntity> {
        const { username, fullname, password, roles } = createUserDto;

        // Check if username already exists
        const exists = await this.userRepository.findOne({
            where: { username }
        });
        if (exists) {
            throw new ConflictException(
                `Username "${username}" is already taken`
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            username,
            fullname,
            password: hashedPassword,
            roles
        });

        return this.userRepository.save(newUser);
    }

    async remove(id: string): Promise<void> {
        const existing = await this.findById(id);
        await this.userRepository.remove(existing);
    }
}
