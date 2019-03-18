import { HttpResponse } from '@angular/common/http';

export interface RequestCacheEntryOptions {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
}
export class RequestCacheEntry implements RequestCacheEntryOptions {
url: string;
response: HttpResponse<any>;
lastRead: number;
}

export function RequestCacheEntryFactory(requestCacheOptions: RequestCacheEntryOptions) {
const requestCache = new RequestCacheEntry();
requestCache.url = requestCacheOptions.url;
requestCache.response = new HttpResponse<any>(requestCacheOptions.response);
requestCache.lastRead = requestCacheOptions.lastRead;
return requestCache;
}
