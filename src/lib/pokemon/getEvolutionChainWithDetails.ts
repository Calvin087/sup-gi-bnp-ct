import { EvolutionChainResponse, SpeciesResponse } from "@/types/pokemon";
import { fetchWithTimeout } from "../fetchWithTimeout";

type FlovorTextEntries = {
  flavor_text: string;
  language: Record<string, string>;
};

const extractDescription = (flavorTextEntries: FlovorTextEntries[]) => {
  const firstEnglishEntry = flavorTextEntries.filter(
    (entry) => entry.language.name === "en"
  );

  const normaliseTextRegex = /[\n\f]+/g;
  return firstEnglishEntry[0].flavor_text.replace(normaliseTextRegex, " ");
};

const getDescriptionAndGeneration = async (speciesUrl: string) => {
  try {
    const speciesResponse: SpeciesResponse = await fetchWithTimeout(speciesUrl);

    const description = extractDescription(speciesResponse.flavor_text_entries);

    return {
      description,
      generation: speciesResponse.generation.name,
      evolutionChainUrl: speciesResponse.evolution_chain.url,
    };
  } catch (error) {
    console.error(
      `Error fetching description and generation for ${speciesUrl}:`,
      error
    );
    return {
      description: "No description available",
      generation: "",
      evolutionChainUrl: "",
    };
  }
};

type EvolutionChain = {
  species: {
    name: string;
  };
  /* 
    "evolves_to" key is a duplicate of
    it's parent "evolves_to"...recursive types?
  */
  evolves_to: EvolutionChain[];
};

const extractAllEvolutions = (evolutionResponse: EvolutionChain) => {
  const evolutions = [];

  let current = evolutionResponse;

  while (current) {
    evolutions.push(current.species.name);
    current = current.evolves_to[0] || null;
  }

  return evolutions;
};

export const getEvolutionChainWithDetails = async (speciesUrl: string) => {
  if (!speciesUrl)
    return {
      generation: "",
      description: "No description available",
      evolutions: [],
    };

  try {
    const { description, evolutionChainUrl, generation } =
      await getDescriptionAndGeneration(speciesUrl);

    const evolutionResponse: EvolutionChainResponse = await fetchWithTimeout(
      evolutionChainUrl
    );
    const evolutions = extractAllEvolutions(evolutionResponse.chain);

    return {
      generation,
      description: description || "No description available",
      evolutions: [...evolutions],
    };
  } catch (error) {
    console.error(`Error fetching details for ${speciesUrl}:`, error);
    return {
      generation: "",
      description: "No description available",
      evolutions: [],
    };
  }
};
