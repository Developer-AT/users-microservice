import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { Reflector } from '@nestjs/core';
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
        if (!request?.headers?.authorization) {
            throw new UnauthorizedException('Invalid Token');
        }

        const bearerToken = request.headers.authorization;
        const authToken: string[] = bearerToken.split(' ');

        if (!authToken[1]) {
            throw new UnauthorizedException('Invalid Token');
        }

        const accessBy = this.reflector.get<ClientType>(
            'accessBy',
            context.getHandler(),
        );

        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        console.log('Auth--Guard--canActivate--roles', accessBy, roles);
        const data = await this.validate(authToken[1], accessBy, roles);
        console.log(data);
        return true;
    }

    async validate(
        token,
        accessBy: ClientType,
        roles: string[],
    ): Promise<object> {
        const dataToValidate: ValidateToken = {
            token: token,
            roles: roles,
            clientType: accessBy,
        };
        console.log('Auth--Guard--validate--dataToValidate', dataToValidate);
        return await this.authprovider.validate(dataToValidate);
    }
}
