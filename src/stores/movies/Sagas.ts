import { MovieDetail, MovieSearchRequest, MoviesResponse } from "@/modules/movies/domain/entities/movies.entity";
import { call, put } from "redux-saga/effects";
import {
    getMovieByIdRequestSuccess,
    getMoviesRequestSuccess,
    setMoviesError,
} from "./Actions";

import authService from "@/modules/auth/infrastructure/services/auth.service";
import moviesService from "@/modules/movies/infrastructure/services/movies.service";
import userService from "@/modules/user-profile/infrastructure/services/user.service";

export function* getMovies(action: any) {
    try {
        
        const request: MovieSearchRequest = {
            currentPage: action.payload.currentPage,
            searchTerm: action.payload.searchTerm,
        };
        const response: MoviesResponse = yield call(moviesService.instance.fetch, request);
        if (response.Response === "False") {
            yield put(setMoviesError({ message: "No movies found" }));
        } else {
            if (authService.instance.isLogged()) {
                const userInfo = authService.instance.userInfo();
                const favouriteMovies = userService.instance.getFavouriteMovies(userInfo);
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
        let movie: MovieDetail = yield call(moviesService.instance.fetchById, action.payload);
        if (authService.instance.isLogged()) {
            const userInfo = authService.instance.userInfo();
            const favouriteMovies = userService.instance.getFavouriteMovies(userInfo);
            movie.favourite =
                favouriteMovies.find((fm) => fm.id === movie.imdbID && fm.userId === userInfo.id) !== undefined;
        }
        yield put(getMovieByIdRequestSuccess(movie));
    } catch (error) {
        yield put(setMoviesError(error));
    }
}
