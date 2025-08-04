export interface SearchProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}
export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    vote_average: number;
    original_language: string;
    release_date: string;
}

/* export interface MovieCardProps {
    movie: Movie & {
        vote_average: number;
        original_language: string;
        release_date: string;
    }
} */