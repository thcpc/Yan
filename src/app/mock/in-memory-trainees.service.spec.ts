import { TestBed } from '@angular/core/testing';

import { InMemoryTraineesService } from './in-memory-trainees.service';

describe('InMemoryDataService', () => {
  let service: InMemoryTraineesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryTraineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
