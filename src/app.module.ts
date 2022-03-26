import { MongooseModule } from '@nestjs/mongoose';
import { Module, CacheModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import configuration from 'config/configuration';
import { RedisClientOptions } from 'redis';
import { redisProvider } from './providers/redis/redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.register<RedisClientOptions>(...redisProvider),
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionName: 'library',
    }),
    UserModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
