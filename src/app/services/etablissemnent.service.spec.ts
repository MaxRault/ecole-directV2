import { TestBed } from '@angular/core/testing';

import { EtablissemnentService } from './etablissemnent.service';

describe('EtablissemnentService', () => {
  let service: EtablissemnentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtablissemnentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
