import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonSearchComponent } from './pokemon-search.component';
import { PokemonApiService } from '../../services/pokemon-api/pokemon-api.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { StateService } from '../../services/state-dropdown/state.service';
import { Pokemon } from '../../../../types';

describe('PokemonSearchComponent', () => {
  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonApiService>;
  let mockStore: MockStore;
  let mockStateService: jasmine.SpyObj<StateService>;
  let renderer2: Renderer2;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonApiService', ['getPokemon']);
    mockStateService = jasmine.createSpyObj('StateService', ['setShowDetails']);
    const initialState = {
      pokemonState: {
        searchedPokemons: [{ name: 'pikachu', sprite: 'pikachu_sprite.png' }]
      }
    };
    
    await TestBed.configureTestingModule({
      imports: [PokemonSearchComponent, FormsModule],
      providers: [
        { provide: PokemonApiService, useValue: mockPokemonService },
        provideMockStore({initialState}),
        { provide: Renderer2, useValue: renderer2 },
        { provide: StateService, useValue: mockStateService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    renderer2 = TestBed.inject(Renderer2);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and display Pokemon from the store', (done) => {
    
    component?.searchedPokemons$?.subscribe(() => {
      expect(component.searchedPokemons).toBeDefined();
      expect(component.searchedPokemons.length).toBe(1);
      expect(component.searchedPokemons[0].name).toBe('pikachu');
      done();
    });
  });

  it('should search for a Pokemon and emit the event', () => {
    const mockPokemon: Pokemon = {
      name: 'pikachu',
      sprites: {
        front_default: 'image_url',
        front_shiny: undefined
      },
      abilities: undefined,
      weight: undefined,
      height: undefined,
      types: undefined,
      stats: []
    };

    mockPokemonService.getPokemon.and.returnValue(of(mockPokemon));
    spyOn(component.pokemonSearched, 'emit');

    component.pokemonName = 'pikachu';
    component.searchPokemon();

    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('pikachu');
    expect(component.pokemonSearched.emit).toHaveBeenCalledWith(mockPokemon);
  });

  it('should handle pokemon not found', () => {
    mockPokemonService.getPokemon.and.returnValue(throwError(() => new Error('Pokemon not found')));

    component.pokemonName = 'unknown';
    component.searchPokemon();

    expect(component.pokemonNotFound).toBeTrue();
    expect(component.pokemonName).toBe('');
  });

  it('should toggle the dropdown', () => {
    component.showDropdown = false;
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();
  });

  it('should filter Pokemon list based on input', () => {
    component.searchedPokemons = [
      { name: 'pikachu', sprite: 'image1' },
      { name: 'bulbasaur', sprite: 'image2' }
    ];

    component.pokemonName = 'pik';
    component.filterPokemons();

    expect(component.filteredPokemons).toEqual([{ name: 'pikachu', sprite: 'image1' }]);
  });

  it('should select a Pokemon from the dropdown and search for it', () => {
    const selectedPokemon = { name: 'charmander', sprite: 'image_url' };
    spyOn(component, 'searchPokemon');

    component.selectPokemon(selectedPokemon);

    expect(component.pokemonName).toBe('charmander');
    expect(component.searchPokemon).toHaveBeenCalled();
  });
});
