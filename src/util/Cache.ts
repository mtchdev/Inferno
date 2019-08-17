interface CacheItem<T> {
    key: string;
    value: T;
}

export var Cache: Array<CacheItem<any>> = [];

export function addToCache<T>(key: string, value: T, ttl: number): CacheItem<T> {
    let values = {key: key, value: value};
    Cache.push(values);

    setTimeout(() => {
        removeFromCache(key);
    }, ttl * 1000);

    return values;
}

export function getFromCache<T>(key: string): T {
    let item = Cache.find((item: CacheItem<T>) => item.key === key)
    return item ? item.value : undefined;
}

export function removeFromCache<T>(key: string): void {
    let i = Cache.findIndex((item: CacheItem<T>) => item.key === key);
    Cache.splice(i, 1);
}
