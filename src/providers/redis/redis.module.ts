import { ConfigModule } from '@nestjs/config';
import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { RedisProvider } from './redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
