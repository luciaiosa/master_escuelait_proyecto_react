import settings from "../../appSettings.json";

interface IPaginationStore {
    readonly currentPage: number;
    readonly ellipseUpperPagesNumber: number;
    readonly ellipseLowerPagesNumber: number;
}

export type PaginationStore = IPaginationStore;

export const InitialPaginationStore: PaginationStore = {
    currentPage: 1,
    ellipseUpperPagesNumber: settings.paginationConfig.showPagesNumber,
    ellipseLowerPagesNumber: 0,
};