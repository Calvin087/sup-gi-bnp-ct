export type StatsType = {
  base_stat: number;
  effort: number;
  stat: Record<string, string>;
};

type ImageSet = {
  frontDefaultAnimated: string;
  frontDefault: string;
};

export type EvolutionImageType = {
  id: number;
  name: string;
  image: string;
};

export type PokemonType = {
  id: number;
  types: string[];
  name: string;
  images: ImageSet;
  stats: StatsType[];
  weight: number;
  height: number;
  cries: string;
  speciesUrl: string;
  description: string;
  generation: string;
  evolutionChain: string[];
  evolutions?: EvolutionImageType[];
};

type PokemonList = {
  name: string;
  url: string;
};

export type GenerationsData = string[];
export type PokemonTypesData = string[];

/* 
    Response Objects
  */
export type PokemonTypeListResponse = {
  count?: number;
  next?: string;
  previous?: string;
  results: PokemonList[];
};

export type PokemonDetailsResponse = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  weight: number;
  height: number;
  cries: { latest: string };
  species: { url: string };
};

export type EvolutionChainResponse = {
  chain: {
    species: {
      name: string;
    };
    evolves_to: EvolutionChainResponse["chain"][];
  };
};

export type SpeciesResponse = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  generation: {
    name: string;
  };
  evolution_chain: {
    url: string;
  };
};
