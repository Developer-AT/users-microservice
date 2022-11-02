import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ServiceAuthConfig from 'config/service.authentication.config';
import { JwtProvider } from './jwt.provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [ServiceAuthConfig],
        }),
    ],
    providers: [JwtProvider],
    exports: [JwtProvider],
})
export class JwtModule {}
