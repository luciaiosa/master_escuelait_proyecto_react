import { call, put } from "redux-saga/effects";
import {
    getMoviesRequestSuccess,
    setMoviesError,
    getMovieByIdRequestSuccess,
} from "./Actions";
import services from "@/services";
import { IMovieDetail, IMovieSearchRequest, IMoviesResponse } from "@/common/interfaces";

export function* getMovies(action: any) {
    try {
        
        const request: IMovieSearchRequest = {
            currentPage: action.payload.currentPage,
            searchTerm: action.payload.searchTerm,
        };
        const response: IMoviesResponse = yield call(services.moviesClient.fetch, request);
        if (response.Response === "False") {
            yield put(setMoviesError({ message: "No movies found" }));
        } else {
            if (services.authService.isLogged()) {
                const userInfo = services.authService.userInfo();
                const favouriteMovies = services.userService.getFavouriteMovies(userInfo);
                response.Search.forEach((element: any) => {
                    element.favourite =
                        favouriteMovies.find((movie) => movie.id === element.imdbID && movie.userId === userInfo.id) !==
                        undefined;
                });
            }
            yield put(getMoviesRequestSuccess(response));
        }
    } catch (error) {
        yield put(setMoviesError(error));
    }
}

export function* getMovieById(action: any) {
    try {
        let movie: IMovieDetail = yield call(services.moviesClient.fetchById, action.payload);
        if (services.authService.isLogged()) {
            const userInfo = services.authService.userInfo();
            const favouriteMovies = services.userService.getFavouriteMovies(userInfo);
            movie.favourite =
                favouriteMovies.find((fm) => fm.id === movie.imdbID && fm.userId === userInfo.id) !== undefined;
        }
        yield put(getMovieByIdRequestSuccess(movie));
    } catch (error) {
        yield put(setMoviesError(error));
    }
}
