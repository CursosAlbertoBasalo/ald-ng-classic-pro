import { TestBed } from '@angular/core/testing';

import { NewAssetService } from './new-asset.service';

describe('NewAssetService', () => {
  let service: NewAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
