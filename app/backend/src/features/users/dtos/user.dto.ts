import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../core/enums/user-roles.enum';

export class UserDto {
    @ApiProperty({ description: 'User identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Unique username' })
    username: string;

    @ApiProperty({ description: 'Full display name of the user' })
    fullname: string;

    @ApiProperty({
        description: 'Roles assigned to the user',
        enum: UserRole,
        isArray: true
    })
    roles: UserRole[];
}
