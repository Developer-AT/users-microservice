import { Injectable } from '@nestjs/common';
import {
    SignOptions,
    sign,
    Secret,
    verify,
    VerifyOptions,
    Algorithm,
    Jwt,
    DecodeOptions,
    decode,
    JwtPayload,
} from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { ServiceType } from 'src/interfaces/enums';
import { join } from 'path';
import { JwtException } from 'src/handlers/exceptions/jwt.exception';

@Injectable()
export class JwtProvider {
    private signOptions: SignOptions;
    private payload: string;
    private privateKey: Secret;
    private verifyOptions: VerifyOptions;
    constructor(private configService: ConfigService) {}

    /**
     * @description Convert Data Object to string
     * @param payload Data Need to Encrypt
     */
    setPayload(payload: { [key: string]: any }): void {
        this.payload = JSON.stringify({
            ...payload,
            service: ServiceType.USER,
            expiresIn:
                new Date().getTime() +
                this.configService.get<number>('service.ttl'),
        });
    }

    /**
     * @description Set Token Signature related Detail
     */
    private setSignOptions(): void {
        this.signOptions = {
            algorithm: this.configService.get<Algorithm>('service.algo'),
        };
    }

    /**
     * @description Read and Set private key of User Service
     */
    private setSecretKey(): void {
        const path = join(
            __dirname,
            this.configService.get<string>('service.keys.private.user'),
        );
        this.privateKey = readFileSync(path, 'utf8');
    }

    /**
     * @description Encrypt Payload Data
     * @returns {string} Encrypted Data
     */
    signPayload(): string {
        try {
            this.setSignOptions();
            this.setSecretKey();
            return sign(this.payload, this.privateKey, this.signOptions);
        } catch (error) {
            throw new JwtException(error);
        }
    }

    /**
     * @description Set Requirements To verify Encrypted Data
     */
    private setVerifyOptions(): void {
        this.verifyOptions = {
            algorithms: [this.configService.get<Algorithm>('service.algo')],
            ignoreExpiration: false,
            complete: true,
        };
    }

    /**
     * @description Verify the JWT token by token origin(Service Type)
     * @param {ServiceType} serviceType To identify the token origin
     * @param {string} token JWT Token
     * @returns {Jwt} Decode Token
     */
    verifyToken(serviceType: ServiceType, token: string): Jwt {
        try {
            this.setVerifyOptions();
            const publicKey = this.fetchPublicKeyByServiceType(serviceType);
            return <Jwt>verify(token, publicKey, this.verifyOptions);
        } catch (error) {
            throw new JwtException(error);
        }
    }

    /**
     * @description Decode JWT token without Verification of Signature
     * @param {string} token JWT token
     * @returns {JwtPayload} Decoded Token
     */
    decodeToken(token: string): JwtPayload {
        try {
            const decodeOptions: DecodeOptions = {
                json: true,
            };
            return <JwtPayload>decode(token, decodeOptions);
        } catch (error) {
            throw new JwtException(error);
        }
    }

    /**
     * @description Read public key of Service by its origin type
     * @param {ServiceType} serviceType To identify the token origin
     * @returns Public Key
     */
    private fetchPublicKeyByServiceType(serviceType: ServiceType) {
        try {
            let key: string;
            switch (serviceType) {
                case ServiceType.AUTH:
                    key = this.configService.get<string>(
                        'service.keys.public.auth',
                    );
                    break;

                case ServiceType.BOOK:
                    key = this.configService.get<string>(
                        'service.keys.public.book',
                    );
                    break;

                case ServiceType.USER:
                    key = this.configService.get<string>(
                        'service.keys.public.user',
                    );
                    break;
            }
            return readFileSync(join(__dirname, key), 'utf8');
        } catch (error) {
            throw new JwtException(error);
        }
    }
}
