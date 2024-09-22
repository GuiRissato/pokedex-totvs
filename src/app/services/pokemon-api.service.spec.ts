import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PokemonApiService } from './pokemon-api.service';

describe('PokemonApiService', () => {
  let service: PokemonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient] 
    });
    service = TestBed.inject(PokemonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});