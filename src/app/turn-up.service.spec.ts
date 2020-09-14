import { TestBed } from '@angular/core/testing';

import { TurnUpService } from './turn-up.service';

describe('TurnUpService', () => {
  let service: TurnUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
