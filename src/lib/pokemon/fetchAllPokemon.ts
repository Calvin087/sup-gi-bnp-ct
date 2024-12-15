import { PokemonTypeListResponse } from "@/types/pokemon";
import { fetchWithTimeout } from "../fetchWithTimeout";
import { enrichPokemonData } from "./enrichPokemonData";

export const fetchAllPokemon = async (
  totalItems: number = 1302,
  limit: number = 400 // 400 stays under the rate limit
) => {
  const allEnrichedPokemonData = [];
  const allGenerationsData = [];
  const allTypesData = [];

  for (let offset = 0; offset < totalItems; offset += limit) {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

    const data: PokemonTypeListResponse = await fetchWithTimeout(baseUrl);

    const { enrichedPokemonData, generationsData, typesData } =
      await enrichPokemonData(data);

    allEnrichedPokemonData.push(...enrichedPokemonData);
    allGenerationsData.push(...generationsData);
    allTypesData.push(...typesData);
  }

  return {
    pokemon: allEnrichedPokemonData,
    generations: allGenerationsData,
    types: allTypesData,
  };
};
