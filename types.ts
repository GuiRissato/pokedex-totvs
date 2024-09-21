export interface Pokemon {
  types: any;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
  
  export interface SearchedPokemon {
    name: string;
    sprite: string;
  }