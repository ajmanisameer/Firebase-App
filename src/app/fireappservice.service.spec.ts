import { TestBed } from '@angular/core/testing';

import { FireappserviceService } from './fireappservice.service';

describe('FireappserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireappserviceService = TestBed.get(FireappserviceService);
    expect(service).toBeTruthy();
  });
});
