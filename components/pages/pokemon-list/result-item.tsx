import { usePokemonDetail } from "hooks/pokemon-hooks";
import Image from "next/image";
import { PokemonItem } from "types/pokemon";

type Props = {
  item: PokemonItem;
};

export default function ResultItem({ item }: Props) {
  const { url, name } = item;
  const { isLoading, data } = usePokemonDetail(url);
  return (
    <div
      className={`flex flex-col ${
        isLoading ? "items-start" : "items-center"
      } justify-center`}
    >
      {isLoading ? (
        <div className="size-24">Loading...</div>
      ) : (
        <Image
          src={data?.sprites?.other["official-artwork"]?.front_default || ""}
          width={96}
          height={96}
          alt={name}
          title={name}
        />
      )}
      <div>{name}</div>
    </div>
  );
}
