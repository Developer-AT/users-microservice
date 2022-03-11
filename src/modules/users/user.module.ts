import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/providers/database/db.module';
import { grpcProviders } from 'src/providers/grpc/grpc.provider';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register(grpcProviders),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class UserModule {}
