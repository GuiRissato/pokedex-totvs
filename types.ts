export interface Pokemon {
abilities: any;
weight: number;
height: number;
  types: any;
  name: string;
  sprites: {
front_shiny: string;
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
  
  export interface SearchedPokemon {
    name: string;
    sprite: string;
  }