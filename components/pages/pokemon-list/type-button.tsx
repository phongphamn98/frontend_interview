"use client";

import { useAppDispatch } from "hooks/redux-hooks";
import React from "react";
import { setPagination, toggleTypeFilter } from "redux/slices/pokemon-slice";
import { PaginationProps, PokemonType } from "types/pokemon";

type Props = {
  children: React.ReactNode;
  item: PokemonType;
  isSelected?: boolean;
};

export default function TypeButton({
  children,
  item,
  isSelected = false,
}: Props) {
  const dispatch = useAppDispatch();
  const handleClickFilter = (type: PokemonType) => {
    const resetPagination: PaginationProps = { page: 0, limit: 48 };
    dispatch(setPagination(resetPagination));
    dispatch(toggleTypeFilter(type));
  };

  return (
    <button
      onClick={() => handleClickFilter(item)}
      type="button"
      className={`p-2 rounded-md font-bold border-2 border-red-900 cursor-pointer ${
        isSelected ? "bg-red-900 text-white" : "bg-white text-red-900"
      }`}
    >
      {children}
    </button>
  );
}
