import { NgModule } from '@angular/core';
import { RequestCacheWithMap } from './request-cache.service';
import { CachingInterceptor } from './interceptors/caching-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCache } from './request-cache';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ]
})
export class NgxCacheModule { }
