import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisProvider {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async set(key: string, value: string, ttl: number = 0) {
        return await this.cacheManager.set(key, value, { ttl: ttl });
    }

    async get(key: string) {
        return await this.cacheManager.get(key);
    }

    async del(key: string) {
        return await this.cacheManager.det(key);
    }

    async reset() {
        return await this.cacheManager.reset();
    }
}
