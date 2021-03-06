import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCacheEntryOptions, RequestCacheEntryFactory } from './request-cache-entry';
import { RequestCache } from './request-cache';


@Injectable()
export class RequestCacheWithMap implements RequestCache {

  readonly LOCAL_STORAGE_KEY = 'CacheMap';
  readonly maxAge = 590000; // maximum cache age (ms)
  cache = this.getStorageCache();

  private getStorageCache(): Map<string, RequestCacheEntryOptions> {
    const cacheMap = new Map<string, RequestCacheEntryOptions>();
    const cacheString = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (cacheString) {
      const partialMap = new Map<string, RequestCacheEntryOptions>(JSON.parse(cacheString));
      partialMap.forEach((cacheEntry, key) => {
        cacheMap.set(key, RequestCacheEntryFactory(cacheEntry));
      });
    }

    return cacheMap;
  }

  private setStorageCache(cacheMap: Map<string, RequestCacheEntryOptions>) {
    const cacheString = JSON.stringify(Array.from(cacheMap.entries()));
    localStorage.setItem(this.LOCAL_STORAGE_KEY, cacheString);
  }

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;

    const entry: RequestCacheEntryOptions = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - this.maxAge;
    this.cache.forEach(cacheEntry => {
      if (cacheEntry.lastRead < expired) {
        this.cache.delete(cacheEntry.url);
      }
    });

    this.setStorageCache(this.cache);
  }
}
