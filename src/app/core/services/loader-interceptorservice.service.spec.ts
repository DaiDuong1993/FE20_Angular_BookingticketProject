import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorserviceService } from './loader-interceptorservice.service';

describe('LoaderInterceptorserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderInterceptorserviceService = TestBed.get(LoaderInterceptorserviceService);
    expect(service).toBeTruthy();
  });
});
