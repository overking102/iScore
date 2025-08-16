import { TestBed } from '@angular/core/testing';

import { Iscore } from './iscore';

describe('Iscore', () => {
  let service: Iscore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Iscore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
