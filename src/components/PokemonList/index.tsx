import { sentenceCaseName } from "@/lib/textUtils/sentenceCase";
import { PokemonType } from "@/types/pokemon";
import Link from "next/link";

type Props = {
  filteredPokemon: () => PokemonType[];
};

const PokemonList = ({ filteredPokemon }: Props) => {
  return (
    <div className="max-h-[350px] overflow-y-auto divide-y divide-dashed divide-[#708028] pr-4">
      {filteredPokemon().map(({ id, name, generation, types }) => {
        return (
          <div key={name} className="text-xl p-1 hover:bg-[#405010] group">
            <Link
              href={`/pokemon/${name}`}
              className="group-hover:text-[#d0d058]"
              prefetch
            >
              <div className="flex justify-between items-end ">
                {sentenceCaseName(name)}
                <div className="text-sm">{types.join(" / ")}</div>
              </div>
              <div className="flex text-sm justify-between">
                <div>#{id} </div>
                <div>{generation}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
