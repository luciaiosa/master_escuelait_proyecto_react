export const GET_MOVIES = "GET_MOVIES";
export const GOT_MOVIES = "GOT_MOVIES";
export const GET_MOVIE_BY_ID = "GET_MOVIE_BY_ID";
export const GOT_MOVIE_BY_ID = "GOT_MOVIE_BY_ID";
export const CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE";
export const SET_MOVIES_ERROR = "SET_MOVIES_ERROR";
export const SET_FAVOURITE_MOVIE ="SET_FAVOURITE_MOVIE";
export const REMOVE_FAVOURITE_MOVIE = "REMOVE_FAVOURITE_MOVIE";

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const getMoviesRequest = (currentPage: number, searchTerm?: string ) => ({
    type: GET_MOVIES,
    payload: {
        currentPage, 
        searchTerm
    }
});

export const getMoviesRequestSuccess = (payload:any) => ({
    type: GOT_MOVIES,
    payload
})

export const getMovieByIdRequest = (id: any) => ({
    type: GET_MOVIE_BY_ID,
    payload: id
});

export const getMovieByIdRequestSuccess = (payload: any) => ({
    type: GOT_MOVIE_BY_ID,
    payload
});

export const clearSelectedMovie = () => ({
    type: CLEAR_SELECTED_MOVIE,
    payload: undefined
});

export const setMoviesError = (payload: any) => ({
    type: SET_MOVIES_ERROR,
    payload
});

export const setFavouriteMovie = (id: string) => ({
    type: SET_FAVOURITE_MOVIE,
    payload: id
});

export const removeFavouriteMovie = (id: string) => ({
    type: REMOVE_FAVOURITE_MOVIE,
    payload: id
})

export const setSearchTerm = (value: string) => ({
    type: SET_SEARCH_TERM,
    payload: value,
});