import { TestBed } from '@angular/core/testing';

import { SchoolDayCampsService } from './school-day-camps.service';

describe('SchoolDayCampsService', () => {
  let service: SchoolDayCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolDayCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
