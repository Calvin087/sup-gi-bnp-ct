import {
  sentenceCaseGeneration,
  sentenceCaseType,
} from "@/lib/textUtils/sentenceCase";
import { usePokemonFilter } from "@/components/hooks/usePokemonFilter";
import pokedex from "../../public/images/pokedex.webp";
import mouseScroll from "../../public/images/mouse-scroll2.gif";
import walkingSprite from "../../public/images/walking-sprite.gif";
import Image from "next/image";
import {
  PokemonType,
  GenerationsData,
  PokemonTypesData,
} from "@/types/pokemon";
import PokemonList from "@/components/PokemonList";
import { fetchAllPokemon } from "@/lib/pokemon/fetchAllPokemon";

type Props = {
  data: {
    pokemon: PokemonType[];
    generations: GenerationsData;
    types: PokemonTypesData;
  };
};

export default function Home({ data }: Props) {
  const {
    searchQuery,
    currentGenerationFilter,
    currentTypeFilter,
    filteredPokemon,
    handleGenerationChange,
    handleSearchQuery,
    handleTypeChange,
    filteredPokemonLength,
  } = usePokemonFilter(data);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-[auto_1fr] xl:w-[1000px] max-w-5xl my-24 mx-8">
        <div className="mx-auto xl:row-start-2 relative">
          <Image
            src={pokedex}
            alt="Pokedex"
            width={400}
            className="mix-blend-luminosity mb-10"
          />
          <Image
            unoptimized
            src={walkingSprite}
            alt="Pokedex"
            width={130}
            className="mix-blend-luminosity absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="xl:row-start-2">
          <div className="flex flex-col xl:flex-row justify-between mb-4 gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQuery}
              className="border border-gray-300 p-2 rounded focus:outline-none"
              placeholder="eg: Pikachu..."
            />

            <select
              value={currentTypeFilter}
              onChange={handleTypeChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
            >
              <option value="">All Types</option>

              {data.types.map((pokemonType) => (
                <option key={pokemonType} value={pokemonType}>
                  {sentenceCaseType(pokemonType)}
                </option>
              ))}
            </select>

            <select
              value={currentGenerationFilter}
              onChange={handleGenerationChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
            >
              <option value="">All Generations</option>

              {data.generations.map((pokemonGeneration) => (
                <option key={pokemonGeneration} value={pokemonGeneration}>
                  {sentenceCaseGeneration(pokemonGeneration)}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm flex justify-end text-[#d0d058] mb-2">
            showing {filteredPokemonLength} results
          </div>
          <PokemonList filteredPokemon={filteredPokemon} />
          <Image
            unoptimized
            src={mouseScroll}
            alt="Pokedex"
            width={120}
            className="mix-blend-darken m-auto mt-10"
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const ONE_DAY_IN_SECONDS = 86400;

  try {
    const limit = 400;
    const totalItems = 100;

    const { pokemon, generations, types } = await fetchAllPokemon(
      totalItems,
      limit
    );

    return {
      props: {
        data: {
          pokemon: pokemon,
          generations: generations,
          types: types,
        },
        revalidate: ONE_DAY_IN_SECONDS,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
