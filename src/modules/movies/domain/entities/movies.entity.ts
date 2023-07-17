import { Rating } from "@/shared/types/rating";

interface IMovieResume {
    imdbID: string;
    Title: string;
    Year: number;
    Poster: string;
    favourite: boolean;
}

interface IMovieDetail {
    Title: string;
    Year: number;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: number;
    imdbRating: number;
    imdbVotes: number;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    favourite: boolean;
}

interface IMovieSearchRequest {
    currentPage: number,
    searchTerm?: string
}

interface IMoviesResponse {
    Response: any;
    Search: any[];
}

export type MovieDetail = IMovieDetail;
export type MovieResume = IMovieResume;
export type MovieSearchRequest = IMovieSearchRequest;
export type MoviesResponse = IMoviesResponse;