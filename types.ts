export interface Pokemon {
abilities: any;
weight: any;
height: any;
  types: any;
  name: string;
  sprites: {
front_shiny: any;
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