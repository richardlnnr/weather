import { TestBed } from '@angular/core/testing';

import { NgxApiService } from './ngx-api.service';

describe('NgxApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxApiService = TestBed.get(NgxApiService);
    expect(service).toBeTruthy();
  });
});
