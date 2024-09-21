import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../store/pokemon.reducer';
import { addPokemon } from '../../store/pokemon.actions';
import { Observable } from 'rxjs';
import { Pokemon, SearchedPokemon } from '../../../../types';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [PokemonSearchComponent,MatIconModule, CommonModule,FormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss'
})
export class PokemonSearchComponent {
  pokemonName: string = '';
  errorMessage: string = '';
  searchedPokemons$: Observable<{ name: string; sprite: string; }[]> | undefined;
  showDropdown: boolean = false;
  searchedPokemons: SearchedPokemon[] = [];
  filteredPokemons: SearchedPokemon[] = [];

  @Output() pokemonSearched = new EventEmitter<Pokemon>(); 

  constructor(
    private pokemonService: PokemonApiService,
    private store: Store<{pokemonState: PokemonState}>
  ) {
    this.searchedPokemons$ = this.store.select(state => state.pokemonState.searchedPokemons)
    this.filterPokemons();
  }

  ngOnInit(): void {
    this.searchedPokemons$?.subscribe(pokemons => {
      this.searchedPokemons = pokemons;
    });
  }

  searchPokemon() {
    if (this.pokemonName) {
      this.pokemonService.getPokemon(this.pokemonName).subscribe({
        next: (pokemon: Pokemon | any) => {
          this.pokemonSearched.emit(pokemon);
           this.searchedPokemons$?.subscribe(searchedPokemons => {
            const pokemonExists = searchedPokemons.some(p => p.name.toLowerCase() === pokemon.name.toLowerCase());

            if (!pokemonExists) {
              this.store.dispatch(addPokemon({
                pokemon: {
                  name: pokemon.name,
                  sprite: pokemon.sprites.front_default
                }
              }));
            }

          }).unsubscribe()

          this.pokemonName = ''
        },
        error: (err) => {
          console.error('Erro ao buscar Pokémon', err);
        }
      });
    }
  }
 toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectPokemon(pokemon: SearchedPokemon) {
    console.log('select',pokemon)
    this.pokemonName = pokemon.name;  
    this.showDropdown = false;
    this.searchPokemon();
  }

  filterPokemons() {
    if (this.pokemonName) {
      this.filteredPokemons = this.searchedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.pokemonName.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.searchedPokemons;
    }
  }
}
