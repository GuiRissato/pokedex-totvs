import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonApiService } from './pokemon-api.service';

describe('PokemonApiService', () => {
  let service: PokemonApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Pokemon data', () => {
    const mockPokemon = {
      name: 'Pikachu',
      height: 0.4,
      weight: 6
    };

    service.getPokemon('pikachu').subscribe((data) => {
      expect(data).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPokemon);
  });

  it('should set and get Pokemon data', () => {
    const mockData = { name: 'Pikachu', height: 0.4 };

    service.setPokemonData(mockData);

    service.pokemonData$.subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });
});
