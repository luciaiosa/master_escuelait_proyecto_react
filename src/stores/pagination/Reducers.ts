import { InitialPaginationStore, PaginationStore } from "./PaginationStore";
import { SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER, SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER, SET_PAGINATION_SELECTED_PAGE } from "./Actions";

import { AnyAction } from "redux";
import { Reducer } from "react";

export const paginationReducer: Reducer<PaginationStore, AnyAction> = (state = InitialPaginationStore, action) => {
    switch (action.type) {
        case SET_PAGINATION_SELECTED_PAGE:
            return { 
                ...state, currentPage: action.payload 
            };
        case SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER:
            return {
                ...state, ellipseUpperPagesNumber: action.payload            
            };
        case SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER:
            return {...state, ellipseLowerPagesNumber: action.payload}
        default:
            return state;
    }
}