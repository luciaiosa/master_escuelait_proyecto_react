import { IMovieStore, IPaginationStore } from "@/common/interfaces";
import settings from "../../appSettings.json";

export const InitialMovieStore: IMovieStore = {
    loading: false,
    searchTerm: "",
    pages: 1,
    movies: [],
    selectedMovie: undefined,
    hasError: false,
    errorMessage: "",
};

export const InitialPaginationStore: IPaginationStore = {
    currentPage: 1,
    ellipseUpperPagesNumber: settings.paginationConfig.showPagesNumber,
    ellipseLowerPagesNumber: 0,
};
