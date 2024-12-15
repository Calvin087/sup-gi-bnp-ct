import Image from "next/image";
import { EvolutionImageType } from "@/types/pokemon";
import Link from "next/link";

type Props = {
  name: string;
  evolutions?: EvolutionImageType[];
};

const EvolutionImages = ({ evolutions, name }: Props) => {
  return (
    <>
      <div className="flex justify-start gap-4">
        {evolutions?.[0]?.image && (
          <Link href={`/pokemon/${evolutions[0].name}`}>
            <Image
              src={evolutions[0].image}
              alt={evolutions[0].name}
              width={150}
              height={150}
              className={`${
                name === evolutions[0].name ? "" : "mix-blend-luminosity"
              }`}
            />
          </Link>
        )}

        {evolutions?.[1]?.image && (
          <Link href={`/pokemon/${evolutions[1].name}`}>
            <Image
              src={evolutions[1].image}
              alt={evolutions[1].name}
              width={150}
              height={150}
              className={`${
                name === evolutions[1].name ? "" : "mix-blend-luminosity"
              }`}
            />
          </Link>
        )}

        {evolutions?.[2]?.image && (
          <Link href={`/pokemon/${evolutions[2].name}`}>
            <Image
              src={evolutions[2].image}
              alt={evolutions[2].name}
              width={150}
              height={150}
              className={`${
                name === evolutions[2].name ? "" : "mix-blend-luminosity"
              }`}
            />
          </Link>
        )}
      </div>
    </>
  );
};

export default EvolutionImages;
