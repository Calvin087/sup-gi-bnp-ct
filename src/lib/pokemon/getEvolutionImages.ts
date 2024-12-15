import { PokemonType } from "@/types/pokemon";
import { getAllPokemonDetails } from "./getAllPokemonDetails";

export const getEvolutionImages = async (
  pokemon: PokemonType,
  baseUrl: string
) => {
  const evolutionImages = await Promise.all(
    pokemon.evolutionChain.map(async (chain) => {
      const {
        name,
        id,
        images: { frontDefault },
      } = await getAllPokemonDetails(baseUrl + chain);

      return {
        id,
        name,
        image: frontDefault,
      };
    })
  );

  return evolutionImages.sort((a, b) => a.id - b.id);
};
