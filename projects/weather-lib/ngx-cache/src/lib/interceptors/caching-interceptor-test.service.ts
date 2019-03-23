import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptorTestService {

  ROOT_URL = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any[]>(this.ROOT_URL);
  }

  postPosts() {
    return this.http.post<any>(this.ROOT_URL, {});
  }
}
