import { TestBed } from '@angular/core/testing';

import { PickKickService } from './pick-kick.service';

describe('PickKickService', () => {
  let service: PickKickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickKickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
