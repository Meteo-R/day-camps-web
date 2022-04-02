import { TestBed } from '@angular/core/testing';

import { RoleMapperService } from './role-mapper.service';

describe('RoleMapperService', () => {
  let service: RoleMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
