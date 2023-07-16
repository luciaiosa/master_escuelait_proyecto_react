export interface IUser {
    id: string;
    email: string;
    favouriteSaveOnCloud: boolean;
}

export interface IUserMovie {
    userId: string,
    id: string
}

export interface IMovieSearchRequest {
    currentPage: number,
    searchTerm?: string
}

export interface IMoviesResponse {
    Response: any;
    Search: any[];
}

export interface IFavouriteStoreStrategy {
    saveFavouriteMovie(id: string, userId: string): boolean;
    removeFavouriteMovie(id: string, userId: string): boolean;
    getFavouriteMovies(userId: string): IUserMovie[];
}

export interface IBreadcrumb {
    link: string | null;
    label: string;
    key: string;
}

export interface IAppStore {
    breadcrumbs: IBreadcrumb[],
    movieStore: IMovieStore,
    isLogged: boolean;
    paginationStore: IPaginationStore;
}

export interface IRating {
    Source: string;
    Value: string;
}

export interface IMovieResume {
    imdbID: string;
    Title: string;
    Year: number;
    Poster: string;
    favourite: boolean;
}

export interface IPagination {
    selectedPage: number;
    ellipseUpperPagesNumber: number;
    ellipseLowerPagesNumber: number;
}

export interface IMovieDetail {
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
    Ratings: IRating[];
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

export interface IPaginationStore {
    readonly currentPage: number;
    readonly ellipseUpperPagesNumber: number;
    readonly ellipseLowerPagesNumber: number;
}

export interface IMovieStore {
    readonly loading: boolean;
    readonly searchTerm: string;
    readonly pages: number;
    readonly movies: IMovieResume[];
    readonly selectedMovie: IMovieDetail | undefined;
    readonly hasError: boolean;
    readonly errorMessage: string;
}