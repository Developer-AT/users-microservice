import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelName, UserSchema } from 'src/providers/schemas/user.schema';
import { GrpcModule } from 'src/providers/grpc/grpc.module';
import { RedisModule } from 'src/providers/redis/redis.module';
import { EntityModule } from 'src/entity/entity.module';
@Module({
    imports: [ConfigModule.forRoot(), GrpcModule, RedisModule, EntityModule],
    controllers: [UserController],
    providers: [UserService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class UserModule {}
