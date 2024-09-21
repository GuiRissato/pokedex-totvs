import { createAction, props } from '@ngrx/store';

export const addPokemon = createAction(
  '[Pokemon Search] Add Pokemon',
  props<{ pokemon: { name: string, sprite: string } }>()
);
