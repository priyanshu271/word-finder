import { TestBed } from '@angular/core/testing';

import { SearchWordsInfoService } from './search-words-info.service';

describe('SearchWordsInfoService', () => {
  let service: SearchWordsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchWordsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
