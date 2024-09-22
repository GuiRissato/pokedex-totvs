import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PokemonApiService } from '../services/pokemon-api/pokemon-api.service';
import { PokemonSearchComponent } from '../components/pokemon-search/pokemon-search.component';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Pokemon } from '../../../types';
import { StoreModule, provideStore } from '@ngrx/store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonApiService>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonApiService', ['getPokemon']);

    await TestBed.configureTestingModule({
      imports: [
        PokemonSearchComponent,
        PokemonDetailsComponent,
        MatIconModule,
        CommonModule,
        BaseChartDirective,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: PokemonApiService, useValue: mockPokemonService },
        provideStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemonData and hide details when onPokemonSearched is called', () => {
    const mockPokemon: Pokemon = {
      abilities: undefined,
      weight: undefined,
      height: undefined,
      types: undefined,
      name: 'pokedex-totvs',
      sprites: {
        front_shiny: undefined,
        front_default: ''
      },
      stats: []
    };
    component.onPokemonSearched(mockPokemon);
    expect(component.pokemonData).toEqual(mockPokemon);
    expect(component.showDetails).toBeFalse();
  });

  it('should toggle showDetails when toggleDetails is called', () => {
    component.showDetails = false;
    component.toggleDetails();
    expect(component.showDetails).toBeTrue();

    component.toggleDetails();
    expect(component.showDetails).toBeFalse();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should render no-search message when pokemonData is null', () => {
    component.pokemonData = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noSearchMessage = compiled.querySelector('.no-search p');
    expect(noSearchMessage?.textContent).toContain('Você ainda não realizou nenhuma busca!');
  });
});
