import { TestBed, inject } from '@angular/core/testing';

import { PoListService } from './po-list.service';

describe('PoListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoListService]
    });
  });

  it('should be created', inject([PoListService], (service: PoListService) => {
    expect(service).toBeTruthy();
  }));
});
