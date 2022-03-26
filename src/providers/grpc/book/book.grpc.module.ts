import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookProvider } from './book.provider';
console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
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
  providers: [BookProvider],
  exports: [BookProvider],
})
export class BookGrpcModule {}
