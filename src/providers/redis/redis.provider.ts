import * as redisStore from 'cache-manager-redis-store';

export const redisProvider = [
  {
    store: redisStore,
    url: process.env.REDIS_URL,
    ttl: 5000,
    isGlobal: true,
  },
];
