import {breadcrumbsReducer, isLoggedReducer} from './app/Reducers';

import { AppStore } from "./app";
import { combineReducers } from "redux";
import {moviesReducer} from './movies/Reducers';
import { paginationReducer } from './pagination/Reducers';

export const rootReducer = combineReducers<AppStore>({
    movieStore: moviesReducer,
    breadcrumbs: breadcrumbsReducer,
    isLogged: isLoggedReducer,
    paginationStore: paginationReducer,
});