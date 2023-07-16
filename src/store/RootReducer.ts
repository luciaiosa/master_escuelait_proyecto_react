import { combineReducers } from "redux";
import {moviesReducer, paginationReducer} from './movies/Reducers';
import {breadcrumbsReducer, isLoggedReducer} from './app/Reducers';
import { IAppStore } from "@/common/interfaces";

export const rootReducer = combineReducers<IAppStore>({
    movieStore: moviesReducer,
    breadcrumbs: breadcrumbsReducer,
    isLogged: isLoggedReducer,
    paginationStore: paginationReducer,
});