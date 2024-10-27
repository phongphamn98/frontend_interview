import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeMap } from "hooks/pokemon-hooks";
import { PaginationProps, PokemonType } from "types/pokemon";

// Define a type for the slice state
interface PokemonState {
  typeFilters: PokemonType[];
  types: TypeMap;
  pokemonList: PokemonType[];
  filteredList: PokemonType[];
  pagination: PaginationProps;
}

// Define the initial state using that type
const initialState: PokemonState = {
  typeFilters: [],
  types: {},
  pokemonList: [],
  filteredList: [],
  pagination: {
    page: 0,
    limit: 48,
  },
};

export const pokemonSlice = createSlice({
  name: "pokemon-type",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    toggleTypeFilter: (state, { payload }: PayloadAction<PokemonType>) => {
      const existedType = state.typeFilters.find(
        (item) => item.name === payload.name
      );
      if (!existedType) {
        state.typeFilters.push(payload);
      } else {
        state.typeFilters = state.typeFilters.filter(
          (item) => item.name !== payload.name
        );
      }
    },
  },
});

export const {
  setTypes,
  setPokemonList,
  setFilteredList,
  setPagination,
  toggleTypeFilter
} = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
