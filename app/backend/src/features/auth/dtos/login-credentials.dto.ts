import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginCredentials {
    @ApiProperty({
        description: 'The username used for authentication',
        required: true,
        minLength: 4
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @ApiProperty({
        description: 'The password used for authentication',
        required: true,
        minLength: 4
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
