import { TestBed } from '@angular/core/testing';

import { DayCampsService } from './day-camps.service';

describe('DayCampsService', () => {
  let service: DayCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
