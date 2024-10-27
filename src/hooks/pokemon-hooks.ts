"use client";

import { API_URL } from "@/configs/url-configs";
import { useQuery } from "@tanstack/react-query";
import { PaginationProps, PokemonItem, PokemonType } from "types/pokemon";
import { useAppDispatch } from "./redux-hooks";
import { useEffect } from "react";
import {
  setPagination,
  setPokemonList,
  setTypes,
} from "redux/slices/pokemon-slice";

const getTypesApi = async () => {
  const response = await fetch(`${API_URL}/type`);
  const data = await response.json();
  return data.results as PokemonType[];
};

const getTypeDetailApi = async (url: string) => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data as PokemonType;
};

const getAllPokemonApi = async (limit?: number) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit || 1200}`);
  const data = await response.json();
  return data.results as PokemonItem[];
};

const getPokemonDetailApi = async (url: string) => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};

export interface TypeMap {
  [key: string]: PokemonType[];
}

export async function fetchTypesAndPokemon(data: PokemonType[]) {
  const typeMap: TypeMap = {};
  await Promise.all(
    data.map(async (type: { name: string; url: string }) => {
      const pokemonResponse = await fetch(type.url);
      const pokemonData = await pokemonResponse.json();
      typeMap[type.name] = pokemonData.pokemon.map(
        (p: { pokemon: PokemonItem }) => p.pokemon
      );
    })
  );

  return { typeMap };
}

export const usePokemonTypes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-type"],
    queryFn: getTypesApi,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      fetchTypesAndPokemon(data).then(({ typeMap }) => {
        dispatch(setTypes(typeMap));
      });
    }
  }, [data]);

  return { data, isLoading, isError, error };
};

export const usePokemonTypeDetail = (url: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-type-detail", url],
    queryFn: () => getTypeDetailApi(url),
  });

  return { data, isLoading, isError, error };
};

export const useAllPokemon = (limit?: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-pokemon", limit],
    queryFn: () => getAllPokemonApi(limit),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setPokemonList(data));
      const pagination: PaginationProps = {
        page: 0,
        limit: 48,
      };
      dispatch(setPagination(pagination));
    }
  }, [data, dispatch]);

  return { data, isLoading, isError, error };
};

export const usePokemonDetail = (url: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon-detail", url],
    queryFn: () => getPokemonDetailApi(url),
  });

  return { data, isLoading, isError, error };
};
