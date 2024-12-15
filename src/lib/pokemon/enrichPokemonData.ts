import { PokemonType, PokemonTypeListResponse } from "@/types/pokemon";
import { getAllPokemonDetails } from "./getAllPokemonDetails";
import { getEvolutionChainWithDetails } from "./getEvolutionChainWithDetails";

export const enrichPokemonData = async (data: PokemonTypeListResponse) => {
  const enrichedPokemonData: PokemonType[] = await Promise.all(
    data.results.map(async ({ url }) => {
      const pokemonDetails = await getAllPokemonDetails(url);
      const { generation, evolutions, description } =
        await getEvolutionChainWithDetails(pokemonDetails.speciesUrl);

      return {
        ...pokemonDetails,
        description: description,
        generation: generation,
        evolutionChain: evolutions,
      };
    })
  );

  const typesData = Array.from(
    enrichedPokemonData.reduce((acc, { types }) => {
      types.forEach((type) => acc.add(type));
      return acc;
    }, new Set())
  );

  const generationsData = Array.from(
    enrichedPokemonData.reduce((acc, { generation }) => {
      acc.add(generation);
      return acc;
    }, new Set())
  );

  return { enrichedPokemonData, typesData, generationsData };
};
