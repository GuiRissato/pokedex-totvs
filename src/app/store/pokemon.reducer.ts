import { createReducer, on } from '@ngrx/store';
import { addPokemon } from './pokemon.actions';

export interface PokemonState {
  searchedPokemons: { name: string, sprite: string }[]; 
}

export const initialState: PokemonState = {
  searchedPokemons: []
};

export const pokemonReducer = createReducer(
  initialState,
  on(addPokemon, (state, { pokemon }) => ({
    ...state,
    searchedPokemons: [...state.searchedPokemons, pokemon]  
  }))
);
