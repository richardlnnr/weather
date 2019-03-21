import { TestBed } from '@angular/core/testing';

import { RequestCacheWithMap } from './request-cache.service';
import { NgxCacheModule } from './ngx-cache.module';
import { RequestCache } from './request-cache';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCacheEntryOptions, RequestCacheEntryFactory } from './request-cache-entry';

describe('RequestCacheService', () => {
  let service: RequestCacheWithMap;

  let httpRequestNuuk: HttpRequest<any>;
  let httpResponseNuuk: RequestCacheEntryOptions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxCacheModule
      ]
    });

    httpRequestNuuk = {
      method: 'GET',
      responseType: 'json',
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
      urlWithParams: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
      withCredentials: false,
      body: null,
      serializeBody: null,
      detectContentTypeHeader: null,
      clone: null,
      headers: null,
      params: null,
      reportProgress: false
    };

    httpResponseNuuk = {
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
      response: {
        headers: null,
        clone: null,
        status: 200,
        statusText: 'OK',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
        ok: true,
        type: 4,
        body: {
          coord: {
            lon: -51.74,
            lat: 64.17
          },
          weather: [{
              id: 521,
              main: 'Rain',
              description: 'shower rain',
              icon: '09d'
            }
          ],
          base: 'stations',
          main: {
            temp: 257.15,
            pressure: 998,
            humidity: 54,
            temp_min: 257.15,
            temp_max: 257.15
          },
          visibility: 10000,
          wind: {
            speed: 3.6,
            deg: 20
          },
          clouds: {
            all: 75
          },
          dt: 1553179800,
          sys: {
            type: 1,
            id: 86,
            message: 0.0048,
            country: 'GL',
            sunrise: 1553160304,
            sunset: 1553204598
          },
          id: 3421319,
          name: 'Nuuk',
          cod: 200
        }
      },
      lastRead: 1553183020834
    };
  });

  afterEach(() => {
    localStorage.removeItem(service.LOCAL_STORAGE_KEY);
  });

  it('should be created', () => {
    service = TestBed.get(RequestCache);
    expect(service).toBeTruthy();
  });

  it('should return an uncached response', () => {
    service = TestBed.get(RequestCache);
    const response = service.get(httpRequestNuuk);
    expect(response).toBeUndefined();
  });

  it('should return a cache expired response', () => {
    const cacheMap = new  Map<string, RequestCacheEntryOptions>();
    httpResponseNuuk.lastRead = (Date.now() - (service.maxAge + 2000));

    cacheMap.set(
      'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
      httpResponseNuuk
    );

    const cacheString = JSON.stringify(Array.from(cacheMap.entries()));

    localStorage.setItem(service.LOCAL_STORAGE_KEY, cacheString);
    service = TestBed.get(RequestCache);
    const response = service.get(httpRequestNuuk);
    expect(response).toBeUndefined();
  });

  it('should return a cached response', () => {
    const cacheMap = new  Map<string, RequestCacheEntryOptions>();
    httpResponseNuuk.lastRead = Date.now();

    cacheMap.set(
      'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey',
      httpResponseNuuk
    );

    const cacheString = JSON.stringify(Array.from(cacheMap.entries()));

    localStorage.setItem(service.LOCAL_STORAGE_KEY, cacheString);
    service = TestBed.get(RequestCache);
    const response = service.get(httpRequestNuuk);
    expect(response instanceof HttpResponse).toBeTruthy();
    expect(response).toEqual(new HttpResponse<any>(httpResponseNuuk.response));
  });

  it('should store a response to the cached', () => {
    const requestKey = 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey';
    const dateBeforeNow = Date.now();

    service = TestBed.get(RequestCache);
    service.put(
      httpRequestNuuk,
      new HttpResponse<any>(httpResponseNuuk.response)
    );

    const cacheString = localStorage.getItem(service.LOCAL_STORAGE_KEY);
    const cacheMap = new Map<string, RequestCacheEntryOptions>(JSON.parse(cacheString));

    expect(cacheMap.has(requestKey)).toBeTruthy();
    expect(cacheMap.size).toEqual(1);

    const requestCacheEntity: RequestCacheEntryOptions = RequestCacheEntryFactory(cacheMap.get(requestKey));

    expect(requestCacheEntity).toBeDefined();
    expect(requestCacheEntity.lastRead).toBeGreaterThanOrEqual(dateBeforeNow);
    expect(requestCacheEntity.lastRead).toBeLessThanOrEqual(Date.now());
    expect(requestCacheEntity.response.body).toEqual(httpResponseNuuk.response.body);
    expect(requestCacheEntity.response.url).toEqual(httpResponseNuuk.response.url);
  });

  it('should remove an expired cache when are storing a new response to the cached', () => {
    const expiredCacheMap = new  Map<string, RequestCacheEntryOptions>();
    httpResponseNuuk.lastRead = (Date.now() - (service.maxAge + 2000));
    const expiredResponse = { ...httpResponseNuuk};
    expiredResponse.url = 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL';
    expiredCacheMap.set(
      'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL',
      expiredResponse
    );

    const expiredCacheString = JSON.stringify(Array.from(expiredCacheMap.entries()));

    localStorage.setItem(service.LOCAL_STORAGE_KEY, expiredCacheString);

    const requestKey = 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=testKey';
    const dateBeforeNow = Date.now();

    service = TestBed.get(RequestCache);
    service.put(
      httpRequestNuuk,
      new HttpResponse<any>(httpResponseNuuk.response)
    );

    const cacheString = localStorage.getItem(service.LOCAL_STORAGE_KEY);
    const cacheMap = new Map<string, RequestCacheEntryOptions>(JSON.parse(cacheString));

    expect(cacheMap.has(requestKey)).toBeTruthy();
    expect(cacheMap.size).toEqual(1);

    const requestCacheEntity: RequestCacheEntryOptions = RequestCacheEntryFactory(cacheMap.get(requestKey));

    expect(requestCacheEntity).toBeDefined();
    expect(requestCacheEntity.lastRead).toBeGreaterThanOrEqual(dateBeforeNow);
    expect(requestCacheEntity.lastRead).toBeLessThanOrEqual(Date.now());
    expect(requestCacheEntity.response.body).toEqual(httpResponseNuuk.response.body);
    expect(requestCacheEntity.response.url).toEqual(httpResponseNuuk.response.url);
  });
});
