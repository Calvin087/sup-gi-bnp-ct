import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { enrichPokemonData } from "@/lib/pokemon/enrichPokemonData";
import { getEvolutionImages } from "@/lib/pokemon/getEvolutionImages";
import { PokemonType } from "@/types/pokemon";
import pokedex from "../../../public/images/pokedex.webp";
import QueryBreadCrumb from "../../components/QueryBreadCrumb";
import EvolutionImages from "@/components/EvolutionImages";
import PokemonDetailsPanel from "@/components/PokemonDetailsPanel";
import Head from "next/head";
import { sentenceCaseName } from "@/lib/textUtils/sentenceCase";

type Props = {
  data: PokemonType;
};
const PokemonPage = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>{sentenceCaseName(data.name)} Details</title>
      </Head>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-[auto_1fr] xl:w-[1000px] max-w-5xl my-24 mx-8">
          <div className="mx-auto xl:row-start-2 relative">
            <Image
              src={pokedex}
              alt="Pokedex"
              width={400}
              className="mix-blend-luminosity mb-10"
            />
            {data.images.frontDefaultAnimated ? (
              <Image
                unoptimized
                src={data.images.frontDefaultAnimated}
                alt={data.name}
                height={90}
                width={90}
                className="mix-blend-luminosity absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2"
              />
            ) : (
              <Image
                src={data.images.frontDefault}
                alt={data.name}
                height={200}
                width={200}
                className="mix-blend-luminosity absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
          <div className="xl:row-start-2">
            <QueryBreadCrumb />
            <PokemonDetailsPanel data={data} />
            <EvolutionImages evolutions={data.evolutions} name={data.name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;

type Params = {
  pokemonId: string;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<Params>
) => {
  const { pokemonId } = context.params!;

  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  const { enrichedPokemonData } = await enrichPokemonData({
    results: [
      {
        name: pokemonId,
        url: `${baseUrl}${pokemonId}`,
      },
    ],
  });

  const pokemon = enrichedPokemonData[0];

  const evolutionData = await getEvolutionImages(pokemon, baseUrl);

  return {
    props: {
      data: {
        ...pokemon,
        evolutions: evolutionData,
      },
    },
  };
};
