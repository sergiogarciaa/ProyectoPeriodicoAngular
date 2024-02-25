import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { periodistaGuard } from './periodista.guard';

describe('periodistaGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => periodistaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
