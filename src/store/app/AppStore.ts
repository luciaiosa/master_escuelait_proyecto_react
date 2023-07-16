import { IAppStore } from "@/common/interfaces";
import { InitialMovieStore, InitialPaginationStore } from "../movies/MovieStore";

export const InitialAppStore: IAppStore = {
    breadcrumbs: [],
    movieStore: InitialMovieStore,
    isLogged: false,
    paginationStore: InitialPaginationStore,
}