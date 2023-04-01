import { UtilsModule } from 'src/providers/utils/utils.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthProvider } from './auth/auth.provider';
import { ProductProvider } from './product/product.provider';
import { JwtModule } from './../jwt/jwt.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
                name: 'AUTH_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: process.env.PROTO_AUTH_PACKAGE,
                    protoPath: join(__dirname, process.env.PROTO_AUTH_PATH),
                    url: process.env.PROTO_AUTH_URL,
                },
            },
            {
                name: 'PRODUCT_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: process.env.PROTO_PRODUCT_PACKAGE,
                    protoPath: join(__dirname, process.env.PROTO_PRODUCT_PATH),
                    url: process.env.PROTO_PRODUCT_URL,
                },
            },
        ]),
        JwtModule,
        UtilsModule,
    ],
    providers: [AuthProvider, ProductProvider],
    exports: [AuthProvider, ProductProvider],
})
export class GrpcModule {}
