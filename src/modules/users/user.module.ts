import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelName, UserSchema } from 'src/schemas/user.schema';
import { GrpcModule } from 'src/providers/grpc/grpc.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [{ name: UserModelName, schema: UserSchema }],
      'library',
    ),
    GrpcModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class UserModule {}
