import { sentenceCaseName } from "@/lib/textUtils/sentenceCase";
import useStats from "./hooks/useStats";
import { PokemonType } from "@/types/pokemon";

type Props = {
  data: PokemonType;
};
const PokemonDetailsPanel = ({ data }: Props) => {
  const { attack, defense, hp } = useStats(data.stats);
  return (
    <div className="">
      <p className="font-bold my-2">ID {data.id}</p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div>
          <p className="font-bold">Name: </p>
          <p className="text-lg font-normal">{sentenceCaseName(data.name)}</p>
        </div>
        <div>
          <p className="font-bold">Generation: </p>
          <p className="text-lg">{sentenceCaseName(data.generation)}</p>
        </div>
        <div>
          <p className="font-bold">Types: </p>
          <p className="text-lg">{data.types.join(" - ")}</p>
        </div>

        <div className="xl:col-span-3">
          <p className="font-bold">Description: </p>
          <p className="w-96 xl:w-full">{sentenceCaseName(data.description)}</p>
        </div>
        <div className="xl:col-span-3">
          <p className="font-bold">Stats: </p>
          <div className="text-lg flex flex-row gap-4">
            <span>HP: {hp}</span>
            <span>Attack: {attack}</span>
            <span>Defence: {defense}</span>
            <span>Weight: {data.weight}</span>
          </div>
        </div>

        <div className="xl:col-span-3">
          <p className="font-bold mb-4">War Cry: </p>

          <figure>
            <audio
              className="w-30 h-10 mix-blend-luminosity mb-6"
              controls
              src={data.cries}
            ></audio>

            <a className="underline" href={data.cries}>
              {"Can't hear audio? -> Download here"}
            </a>
          </figure>
        </div>
      </div>
    </div>
  );
};
export default PokemonDetailsPanel;
