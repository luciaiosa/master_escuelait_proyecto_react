export const SET_PAGINATION_SELECTED_PAGE = "SET_PAGINATION_SELECTED_PAGE";
export const SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER = "SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER";
export const SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER = "SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER";

export const setPaginationSelectedPage = (pageNumber: number) => ({
    type: SET_PAGINATION_SELECTED_PAGE,
    payload: pageNumber
});

export const setPaginationEllipseUpperPagesNumber = (pagesNumber: number) => ({
    type: SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER,
    payload: pagesNumber
});

export const setPaginationEllipseLowerPagesNumber = (pagesNumber: number) => ({
    type: SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER,
    payload: pagesNumber
});
