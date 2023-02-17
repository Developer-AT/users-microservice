import { ClientType, UserRole } from 'src/interfaces/enums';

export interface ValidateToken {
    token: string;
    roles: string[];
    clientType: ClientType;
}

export interface CreateUser {
    username: string;
    password: string;
    email: string;
    clientRole: UserRole;
}

export interface UpdateUserRole {
    userid: string;
    roleName: UserRole;
}

export interface GenerateToken {
    username: string;
    password: string;
}
