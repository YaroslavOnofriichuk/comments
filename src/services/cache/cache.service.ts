import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async get(key: string) {
        return this.cacheManager.get(key);
    }

    async set(key: string, value: any, ttl: number) {
        return this.cacheManager.set(key, value, ttl);
    }

    async del(key: string) {
        return this.cacheManager.del(key);
    }

    async reset() {
        return this.cacheManager.reset();
    }
}
