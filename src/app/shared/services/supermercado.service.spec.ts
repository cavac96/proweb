import { TestBed } from '@angular/core/testing';

import { SupermercadoService } from './supermercado.service';

describe('SupermercadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupermercadoService = TestBed.get(SupermercadoService);
    expect(service).toBeTruthy();
  });
});
