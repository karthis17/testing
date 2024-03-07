import { TestBed } from '@angular/core/testing';

import { FuntestService } from './funtest.service';

describe('FuntestService', () => {
  let service: FuntestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuntestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
