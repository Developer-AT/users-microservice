import {
    CreateUser,
    GenerateToken,
    UpdateUserRole,
    ValidateToken,
} from './auth.interface';
import { Observable } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { JwtProvider } from 'src/providers/jwt/jwt.provider';
import { ServiceType } from 'src/interfaces/enums';

@Injectable()
export class AuthProvider implements OnModuleInit {
    private authService;
    private userService;
    private metaData: Metadata;

    constructor(
        @Inject('AUTH_PACKAGE') private client: ClientGrpc,
        private readonly jwt: JwtProvider,
    ) {
        this.metaData = new Metadata();
        this.metaData.set('service', ServiceType.USER);
    }
    onModuleInit() {
        this.authService = this.client.getService('AuthService');
        this.userService = this.client.getService('UserService');
    }

    validate(payload: ValidateToken): Observable<object> {
        this.setToken();
        return this.authService.Validate(payload, this.metaData);
    }

    createUser(payload: CreateUser): Observable<object> {
        this.setToken();
        return this.userService.Create(payload, this.metaData);
    }

    updateUserRole(payload: UpdateUserRole): Observable<object> {
        this.setToken();
        return this.userService.UpdateRole(payload, this.metaData);
    }

    generateToken(payload: GenerateToken): Observable<object> {
        this.setToken();
        return this.userService.GenerateToken(payload, this.metaData);
    }

    setToken() {
        try {
            this.jwt.setPayload({});
            const token = this.jwt.signPayload();
            this.metaData.set('authorization', `Bearer ${token}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
