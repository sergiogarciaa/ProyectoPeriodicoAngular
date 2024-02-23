import { TestBed } from '@angular/core/testing';

import { SwalFireService } from './swal-fire.service';

describe('SwalFireService', () => {
  let service: SwalFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
