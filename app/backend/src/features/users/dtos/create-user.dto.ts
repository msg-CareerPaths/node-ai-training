import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../core/enums/user-roles.enum';

export class CreateUserDto {
    @ApiProperty({
        required: true,
        minLength: 4,
        description: 'The username of the user',
        example: 'doej'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @ApiProperty({
        required: true,
        minLength: 1,
        description: 'The name of the user',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({
        required: true,
        minLength: 4,
        description: 'The password of the user',
        example: '12345678'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @ApiProperty({
        required: true,
        minLength: 1,
        isArray: true,
        enum: UserRole,
        description: 'The roles of the user',
        example: ['admin', 'user']
    })
    @IsNotEmpty()
    @IsEnum(UserRole, { each: true })
    roles: UserRole[];
}
