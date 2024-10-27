"use client";

import { useAppSelector } from "hooks/redux-hooks";
import { useDispatch } from "react-redux";
import { setPagination } from "redux/slices/pokemon-slice";
import { PaginationProps } from "types/pokemon";

export default function Pagination() {
  const { pagination, pokemonList, filteredList, typeFilters } = useAppSelector(
    (state) => state.pokemonType
  );
  const dispatch = useDispatch();

  const handleClickPrevPage = () => {
    const newPage: PaginationProps = {
      ...pagination,
      page: pagination.page - 1,
    };
    dispatch(setPagination(newPage));
  };

  const handleClickNextPage = () => {
    const newPage: PaginationProps = {
      ...pagination,
      page: pagination.page + 1,
    };
    dispatch(setPagination(newPage));
  };
  return (
    <div className="my-8 flex justify-center">
      <button
        onClick={handleClickPrevPage}
        disabled={pagination.page === 0}
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:select-none"
      >
        Prev
      </button>
      <button
        onClick={handleClickNextPage}
        disabled={
          pagination.page + 1 >=
          (typeFilters.length > 0 ? filteredList.length : pokemonList.length) /
            pagination.limit
        }
        className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:select-none"
      >
        Next
      </button>
    </div>
  );
}
