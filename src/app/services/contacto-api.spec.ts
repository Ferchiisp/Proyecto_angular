import { TestBed } from '@angular/core/testing';

import { ContactoApi } from './contacto-api';

describe('ContactoApi', () => {
  let service: ContactoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
