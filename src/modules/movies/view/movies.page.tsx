import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MoviesList from "@/modules/movies/view/components/list/movies.list";
import authService from "@/modules/auth/infrastructure/services/auth.service";
import userService from "@/modules/user-profile/infrastructure/services/user.service";
import CustomError from "@/shared/components/error/Error";
import SearchBar from "@/shared/components/search-bar/SearchBar";
import Pagination from "@/shared/components/pagination/Pagination";
import { useWindowResize } from "@/shared/hooks/useWindowResize";
import { AppStore } from "@/stores/app";
import { MovieStore, getMoviesRequest, setSearchTerm, setFavouriteMovie, removeFavouriteMovie } from "@/stores/movies";
import { setPaginationSelectedPage } from "@/stores/pagination/Actions";
import { PaginationStore } from "@/stores/pagination/PaginationStore";
import { styles } from "./movies.page.styles";
import settings from "../../../appSettings.json";

const MoviesPage: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const windowWidth = useWindowResize().width;

    const { movies, searchTerm, pages, hasError, errorMessage } = useSelector<
        AppStore,
        MovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);
    const {
        currentPage,
        ellipseUpperPagesNumber,
        ellipseLowerPagesNumber,
    } = useSelector<AppStore, PaginationStore>(
        (state) => state.paginationStore
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
    }, []);

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
    }, [searchTerm]);

    const getHeaderClass = (windowWidth: number) => {
        return windowWidth < 990
            ? classes.pageHeaderMobile
            : classes.pageHeader;
    };

    const onSearchBarValueChange = (value: string) => {
        dispatch(setSearchTerm(value));
    };

    const onCurrentPageChange = (value: number) => {
        dispatch(setPaginationSelectedPage(value));
        dispatch(getMoviesRequest(value, searchTerm));
    };

    const pageNumbers = (): Array<number> => {
        const pageNumbers = [];
        for (let i = 1; i <= pages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const addFavourite = (id: string) => {
        const user = authService.instance.userInfo();
        const result = userService.instance.addFavouriteMovie(id, user);
        if (result) dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        const user = authService.instance.userInfo();
        const result = userService.instance.removeFavouriteMovie(id, user);
        if (result) dispatch(removeFavouriteMovie(id));
    };

    const renderPagination = (): JSX.Element => {
        if (pages > 1) {
            return (
                <Pagination
                    pageNumbers={pageNumbers()}
                    currentPage={currentPage}
                    ellipseUpperPagesNumber={ellipseUpperPagesNumber}
                    ellipseLowerPagesNumber={ellipseLowerPagesNumber}
                    config={settings.paginationConfig}
                    pageSelected={(value: number) => onCurrentPageChange(value)}
                ></Pagination>
            );
        }
        return <div></div>;
    };


    const renderContent = (): JSX.Element => {
        if (hasError) {
            return <CustomError title={errorMessage}></CustomError>;
        }
        return (
            <div>
                <MoviesList movies={movies} addFavourite={addFavourite} removeFavourite={removeFavourite} />
                {renderPagination()}
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={getHeaderClass(windowWidth)}>
                    <div>
                        <h2 className={classes.pageHeaderTitle}>Movies list</h2>
                    </div>

                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchValueChange={(value: any) =>
                            onSearchBarValueChange(value)
                        }
                    />
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MoviesPage;
