import { Reflector } from '@nestjs/core';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Metadata, MetadataValue } from '@grpc/grpc-js';
import { JwtProvider } from 'src/providers/jwt/jwt.provider';
import {
    HttpStatusMessage,
    ServiceType,
    AuthStrategy,
} from 'src/interfaces/enums';
import { RpcException } from '@nestjs/microservices';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class MicroserviceGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwt: JwtProvider,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Metadata = context.switchToRpc().getContext();

            const service = <ServiceType>request.get('service').toString();
            const bearerToken = request.get('authorization').toString();
            const authToken: string[] = bearerToken.split(' ');
            if (authToken[0] != AuthStrategy.BEARER) {
                throw new UnauthorizedException('Invalid Auth Strategy');
            }

            const tokendata = await this.jwt.verifyToken(service, authToken[1]);
            const tokenPayload = <JwtPayload>tokendata.payload;
            if (tokenPayload.expiresIn < new Date().getTime()) {
                throw new UnauthorizedException('Token Expired');
            }

            const accessBy = this.reflector.get<string[]>(
                'accessBy',
                context.getHandler(),
            );
            console.log('Guard--canActivate--tokenPayload', tokenPayload);
            if (accessBy.indexOf(tokenPayload.service) < 0) {
                throw new ForbiddenException('Access not Granted');
            }

            console.log('Microservice--Guard--canActivate--request', request);
            return true;
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
