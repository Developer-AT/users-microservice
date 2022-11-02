import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ClientType } from 'src/interfaces/enums';
import { ValidateToken } from 'src/providers/grpc/auth/auth.interface';
import { AuthProvider } from 'src/providers/grpc/auth/auth.provider';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authprovider: AuthProvider,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        const data = await this.validate(request.headers.authorization, roles);
        console.log(data);
        return true;
    }

    validate(token, roles): Promise<object> {
        const dataToValidate: ValidateToken = {
            token: token,
            roles: roles,
            clientType: ClientType.USER,
        };
        return firstValueFrom(this.authprovider.validate(dataToValidate));
    }
}
