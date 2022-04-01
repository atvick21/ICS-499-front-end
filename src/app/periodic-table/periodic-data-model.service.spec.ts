import { TestBed } from '@angular/core/testing';

import { PeriodicDataModelService } from './periodic-data-model.service';

describe('PeriodicDataModelService', () => {
  let service: PeriodicDataModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodicDataModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
