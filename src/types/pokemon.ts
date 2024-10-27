export interface PokemonType {
    name: string;
    url: string;
}

export interface PokemonItem {
    name: string;
    url: string;
}

export interface PaginationProps {
    page: number;
    limit: number;
}