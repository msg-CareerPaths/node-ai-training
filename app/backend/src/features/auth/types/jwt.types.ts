import { UserRole } from '../../../core/enums/user-roles.enum';

export type JwtToken = {
    username: string;
    sub: string;
    iat: number;
    exp: number;
};

export type AuthUserData = {
    id: string;
    username: string;
    fullname: string;
    roles: UserRole[];
    jwt: JwtToken;
};
