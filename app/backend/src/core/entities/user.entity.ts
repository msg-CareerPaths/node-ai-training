import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-roles.enum';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    username: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        enumName: 'user_role_enum',
        array: true,
        default: [UserRole.User]
    })
    roles: UserRole[];
}
