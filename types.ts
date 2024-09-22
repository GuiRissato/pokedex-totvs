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