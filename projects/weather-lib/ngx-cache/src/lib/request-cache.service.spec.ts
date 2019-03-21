import { TestBed } from '@angular/core/testing';

import { RequestCacheWithMap } from './request-cache.service';
import { NgxCacheModule } from './ngx-cache.module';
import { RequestCache } from './request-cache';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCacheEntryOptions } from './request-cache-entry';

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
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
      urlWithParams: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
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
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
      response: {
        headers: null,
        clone: null,
        status: 200,
        statusText: 'OK',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
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
      'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
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
      'https://api.openweathermap.org/data/2.5/weather?q=Nuuk,GL&appid=ebc13b9317e3997e0f3d4fd53dfa1964',
      httpResponseNuuk
    );

    const cacheString = JSON.stringify(Array.from(cacheMap.entries()));

    localStorage.setItem(service.LOCAL_STORAGE_KEY, cacheString);
    service = TestBed.get(RequestCache);
    const response = service.get(httpRequestNuuk);
    expect(response instanceof HttpResponse).toBeTruthy();
    expect(response).toEqual(new HttpResponse<any>(httpResponseNuuk.response));
  });
});
