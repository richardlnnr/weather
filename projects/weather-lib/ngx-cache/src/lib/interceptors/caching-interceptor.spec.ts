import { TestBed } from '@angular/core/testing';
import { CachingInterceptorTestService } from './caching-interceptor-test.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxCacheModule } from '../ngx-cache.module';
import { RequestCacheEntryOptions } from '../request-cache-entry';
import { HttpResponse } from '@angular/common/http';


describe(`CachingInterceptor`, () => {
  let service: CachingInterceptorTestService;
  let httpMock: HttpTestingController;
  const LOCAL_STORAGE_KEY = 'CacheMap';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxCacheModule
      ],
      providers: [
        CachingInterceptorTestService
      ]
    });

    service = TestBed.get(CachingInterceptorTestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it('should flush a get request and store to cache', () => {
    service.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne({url: service.ROOT_URL, method: 'GET'});
    req.flush({});

    const cachedResponse = localStorage.getItem(LOCAL_STORAGE_KEY);
    expect(cachedResponse).toBeDefined();
  });

  it('should flush a get request and get cached stored in localStorage', () => {
    const cacheMap = new  Map<string, RequestCacheEntryOptions>();

    cacheMap.set(
      service.ROOT_URL,
      {
        lastRead: Date.now(),
        response: new HttpResponse(
          {
            body: [{ cachedTest: 'cachedTest' }]
          }
        ),
        url: service.ROOT_URL
      }
    );

    const cacheString = JSON.stringify(Array.from(cacheMap.entries()));

    localStorage.setItem(LOCAL_STORAGE_KEY, cacheString);

    service.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response[0]).toEqual({ cachedTest: 'cachedTest' });
    });

    httpMock.expectNone({url: service.ROOT_URL, method: 'GET'});
  });

  it('should post but not cache', () => {
    service.postPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne({url: service.ROOT_URL, method: 'POST'});
    req.flush({});
  });
});
