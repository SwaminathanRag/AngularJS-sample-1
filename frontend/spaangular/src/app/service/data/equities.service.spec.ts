import { TestBed } from '@angular/core/testing';

import { EquitiesService } from './equities.service';

describe('EquitiesService', () => {
  let service: EquitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
