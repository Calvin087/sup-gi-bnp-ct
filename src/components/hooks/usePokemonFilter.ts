import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { updateSessionStorage } from "@/lib/sessions/updateSessionStorage";
import { PokemonType } from "@/types/pokemon";

type Props = {
  pokemon: PokemonType[];
  types: string[];
  generations: string[];
};

export function usePokemonFilter(data: Props) {
  const router = useRouter();
  const { query } = router;

  const [currentTypeFilter, setCurrentTypeFilter] = useState("");
  const [currentGenerationFilter, setCurrentGenerationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const initialType = (query.type || "") as string;
    const initialGeneration = (query.generation || "") as string;
    const initialSearchQuery = (query.search || "") as string;

    setCurrentTypeFilter(initialType);
    setCurrentGenerationFilter(initialGeneration);
    setSearchQuery(initialSearchQuery);

    const queryToSave = {
      type: initialType,
      generation: initialGeneration,
      search: initialSearchQuery,
    };
    updateSessionStorage(queryToSave);
  }, [query]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateQueryParams = (newQueryParams: any) => {
    const currentQuery = { ...router.query, ...newQueryParams };

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      {
        shallow: true,
      }
    );

    updateSessionStorage(currentQuery);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setCurrentTypeFilter(newType);
    updateQueryParams({ type: newType });
  };

  const handleGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGeneration = e.target.value;
    setCurrentGenerationFilter(newGeneration);
    updateQueryParams({ generation: newGeneration });
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value.toLowerCase();
    setSearchQuery(newSearchQuery);
    updateQueryParams({ search: newSearchQuery });
  };

  const filteredPokemon = () => {
    return data.pokemon.filter((pokemon) => {
      const typeMatch = currentTypeFilter
        ? pokemon.types.includes(currentTypeFilter)
        : true;

      const generationMatch = currentGenerationFilter
        ? pokemon.generation === currentGenerationFilter
        : true;

      const queryMatch = pokemon.evolutionChain.some((evolution) =>
        evolution.toLowerCase().includes(searchQuery)
      );

      return typeMatch && generationMatch && queryMatch;
    });
  };

  const filteredPokemonLength = filteredPokemon().length;

  return {
    currentTypeFilter,
    currentGenerationFilter,
    searchQuery,
    handleTypeChange,
    handleGenerationChange,
    handleSearchQuery,
    filteredPokemon,
    types: data.types,
    generations: data.generations,
    filteredPokemonLength,
  };
}
