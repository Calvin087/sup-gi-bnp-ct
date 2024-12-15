import { PokemonDetailsResponse } from "@/types/pokemon";

import { fetchWithTimeout } from "../fetchWithTimeout";

export const getAllPokemonDetails = async (url: string) => {
  try {
    const data: PokemonDetailsResponse = await fetchWithTimeout(url);

    if (!data) throw new Error("No data returned");

    return {
      id: data.id,
      types: data.types.map((item) => item.type.name),
      name: data.name,
      images: {
        frontDefaultAnimated: data.sprites.other.showdown.front_default,
        frontDefault: data.sprites.front_default,
      },
      stats: data.stats,
      weight: data.weight,
      height: data.height,
      cries: data.cries.latest,
      speciesUrl: data.species.url,
    };
  } catch (error) {
    console.error(`Error fetching details for ${url}:`, error);
    throw error;
  }
};
