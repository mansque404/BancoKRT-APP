import { TestBed } from '@angular/core/testing';

import { ClientePixService } from './cliente-pix.service';

describe('ClientePixService', () => {
  let service: ClientePixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
