import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GrpcModule } from 'src/providers/grpc/grpc.module';
import { RedisModule } from 'src/providers/redis/redis.module';
import { EntityModule } from 'src/entity/entity.module';
import { KafkaModule } from 'src/providers/kafka/kafka.module';
import { JwtModule } from 'src/providers/jwt/jwt.module';
import { UtilsModule } from 'src/providers/utils/utils.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
        GrpcModule,
        RedisModule,
        EntityModule,
        KafkaModule,
        JwtModule,
        UtilsModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }
export class UserModule {}
