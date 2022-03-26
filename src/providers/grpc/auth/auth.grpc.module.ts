import { ConfigModule } from '@nestjs/config';
import { AuthProvider } from './auth.provider';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
console.log(__dirname);
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
    ]),
  ],
  providers: [AuthProvider],
  exports: [AuthProvider],
})
export class AuthGrpcModule {}
