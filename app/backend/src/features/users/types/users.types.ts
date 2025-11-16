import { UserRole } from '../../../core/enums/user-roles.enum';

export type CreateUserPayload = {
    username: string;
    fullname: string;
    password: string;
    roles: UserRole[];
};
