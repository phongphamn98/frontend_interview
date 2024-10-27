"use client";

import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { PokemonItem } from "types/pokemon";
import ResultItem from "./result-item";
import { useEffect } from "react";
import { setFilteredList } from "redux/slices/pokemon-slice";

function intersectPokemon(
  typeMap: Record<string, PokemonItem[]>,
  selectedTypes: string[]
): PokemonItem[] {
  const selectedTypeArrays = selectedTypes.map((type) => typeMap[type] || []);

  return selectedTypeArrays.reduce((acc, currentArray) => {
    const currentSet = new Set(currentArray.map((p) => p.name));
    return acc.filter((pokemon) => currentSet.has(pokemon.name));
  });
}

export default function ResultList() {
  const { pokemonList, pagination, typeFilters, types } = useAppSelector(
    (state) => state.pokemonType
  );
  const dispatch = useAppDispatch();

  const pokemons =
    typeFilters.length === 0
      ? pokemonList
      : intersectPokemon(
          types,
          typeFilters.map((type) => type.name)
        );

  useEffect(() => {
    dispatch(setFilteredList(typeFilters.length !== 0 ? pokemons : []));
  }, [typeFilters]);

  if (pokemons.length === 0) {
    return (
      <div className="text-center text-3xl mx-auto my-24 font-bold">
        No results found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {pokemons
        .slice(
          pagination.page * pagination.limit,
          pagination.page * pagination.limit + 48
        )
        .map((item, index) => (
          <div className="col-span-1" key={index}>
            <ResultItem item={item} />
          </div>
        ))}
    </div>
  );
}
