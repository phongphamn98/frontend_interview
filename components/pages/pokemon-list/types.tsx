/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAllPokemon, usePokemonTypes } from "hooks/pokemon-hooks";
import { useAppSelector } from "hooks/redux-hooks";
import TypeButton from "./type-button";

export default function Types() {
  useAllPokemon();
  const { data, isLoading } = usePokemonTypes();
  const { pokemonList, typeFilters, filteredList } = useAppSelector(
    (state) => state.pokemonType
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="m-4 flex">
        <div className="mr-2 my-4 font-bold self-start">Types:</div>
        <div className="flex items-center gap-4 flex-wrap m-2">
          {data?.map((item) => (
            <TypeButton
              isSelected={typeFilters.some((f) => f.name === item.name)}
              item={item}
              key={item.name}
            >
              {item.name}
            </TypeButton>
          ))}
        </div>
      </div>

      {pokemonList.length !== 0 ? (
        <div className="my-12 mx-4 font-bold">
          {typeFilters.length > 0 ? filteredList.length : pokemonList.length}{" "}
          results found.
        </div>
      ) : null}
    </div>
  );
}
