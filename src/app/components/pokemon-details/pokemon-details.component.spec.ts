import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { StateService } from '../../services/state-dropdown/state.service';
import { of } from 'rxjs';
import { Pokemon } from '../../../../types';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockStateService = jasmine.createSpyObj('StateService', ['setShowDetails'], {
      showDetails$: of(false)
    });

    await TestBed.configureTestingModule({
      imports: [PokemonDetailsComponent],
      providers: [{ provide: StateService, useValue: mockStateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Pokemon details when pokemonData is provided', () => {
    const mockPokemon: Pokemon = {
      name: 'Pikachu',
      height: 0.4,
      weight: 6,
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' }, is_hidden: false }],
      sprites: { front_default: 'pikachu.png', front_shiny: 'pikachu_shiny.png' },
      stats: [
        { base_stat: 35, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
        { base_stat: 55, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
        { base_stat: 40, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
        { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
        { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
        { base_stat: 90, effort: 2, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
      ]
    };

    component.pokemonData = mockPokemon;
    fixture.detectChanges();

    const nameElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(nameElement.textContent).toContain('Pikachu');
  });

  it('should get card styles based on pokemon type', () => {
    component.pokemonData = {
      name: 'Pikachu',
      height: 0.4,
      weight: 6,
      types: [{ type: { name: 'electric' } }],
      abilities: [],
      sprites: { front_default: 'pikachu.png', front_shiny: 'pikachu_shiny.png' },
      stats:  [
        { base_stat: 35, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
        { base_stat: 55, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
        { base_stat: 40, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
        { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
        { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
        { base_stat: 90, effort: 2, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
      ]
    };

    const styles = component.getCardStyles();
    expect(styles.backgroundColor).toBe(component.getTypeColorWithTransparency('electric', 0.6));
  });
});
