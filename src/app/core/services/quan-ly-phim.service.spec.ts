import { TestBed } from '@angular/core/testing';

import { QuanLyPhimService } from './quan-ly-phim.service';

describe('QuanLyPhimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuanLyPhimService = TestBed.get(QuanLyPhimService);
    expect(service).toBeTruthy();
  });
});
