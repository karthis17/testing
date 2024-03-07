import { TestBed } from '@angular/core/testing';

import { NamingService } from './naming.service';

describe('NamingService', () => {
  let service: NamingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
