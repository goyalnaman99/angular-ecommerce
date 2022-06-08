import { TestBed } from '@angular/core/testing';

import { NavFootService } from './nav-foot.service';

describe('NavFootService', () => {
  let service: NavFootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavFootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
