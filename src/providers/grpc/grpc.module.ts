import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthProvider } from './auth/auth.provider';
import { BookProvider } from './book/book.provider';
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
      {
        name: 'BOOK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: process.env.PROTO_BOOK_PACKAGE,
          protoPath: join(__dirname, process.env.PROTO_BOOK_PATH),
          url: process.env.PROTO_BOOK_URL,
        },
      },
    ]),
  ],
  providers: [AuthProvider, BookProvider],
  exports: [AuthProvider, BookProvider],
})
export class GrpcModule {}
