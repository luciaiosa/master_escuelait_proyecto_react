import { MovieDetail, MovieResume } from "@/modules/movies/domain/entities/movies.entity";

interface IMovieStore {
    readonly loading: boolean;
    readonly searchTerm: string;
    readonly pages: number;
    readonly movies: MovieResume[];
    readonly selectedMovie: MovieDetail | undefined;
    readonly hasError: boolean;
    readonly errorMessage: string;
}

export type MovieStore = IMovieStore;

export const InitialMovieStore: MovieStore = {
    loading: false,
    searchTerm: "",
    pages: 1,
    movies: [],
    selectedMovie: undefined,
    hasError: false,
    errorMessage: "",
};
