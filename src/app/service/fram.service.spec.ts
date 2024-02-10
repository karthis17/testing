import { TestBed } from '@angular/core/testing';

import { FramService } from './fram.service';

describe('FramService', () => {
  let service: FramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
