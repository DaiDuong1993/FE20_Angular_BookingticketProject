import { TestBed, async, inject } from '@angular/core/testing';

import { AdminLoginGuard } from './admin-login.guard';

describe('AdminLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLoginGuard]
    });
  });

  it('should ...', inject([AdminLoginGuard], (guard: AdminLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
