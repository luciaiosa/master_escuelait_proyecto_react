import { InitialMovieStore, MovieStore } from "../movies";
import { InitialPaginationStore, PaginationStore } from "../pagination/PaginationStore";

import { BreadCrumb } from "@/shared/types/breadcrumb";

export interface IAppStore {
    breadcrumbs: BreadCrumb[],
    movieStore: MovieStore,
    isLogged: boolean;
    paginationStore: PaginationStore;
}

export type AppStore = IAppStore;

export const InitialAppStore: AppStore = {
    breadcrumbs: [],
    movieStore: InitialMovieStore,
    isLogged: false,
    paginationStore: InitialPaginationStore,
}