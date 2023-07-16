import { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'
import { useWindowResize } from "@hooks/useWindowResize";
import {
    getMoviesRequest,
    setFavouriteMovie,
    removeFavouriteMovie,
    setPaginationSelectedPage,
    setSearchTerm,
} from "@stores/movies";
import SearchBar from "@components/search-bar/SearchBar";
import { styles } from "./MoviesListStyles";
import Pagination from "@components/pagination/Pagination";
import CustomError from "@components/error/Error";
import settings from "../../appSettings.json";
import { Favourite } from "../favourite/Favourite";
import services from "@/services";
import { IAppStore, IMovieStore, IPaginationStore, IMovieResume } from "@/common/interfaces";


const MoviesList: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const windowWidth = useWindowResize().width;
    const [gridListColsNumber, setGridListColsNumber] = useState(2);

    const { movies, searchTerm, pages, hasError, errorMessage } = useSelector<
        IAppStore,
        IMovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<IAppStore, boolean>((state) => state.isLogged);
    const {
        currentPage,
        ellipseUpperPagesNumber,
        ellipseLowerPagesNumber,
    } = useSelector<IAppStore, IPaginationStore>(
        (state) => state.paginationStore
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
    }, []);

    useEffect(() => {
        setGridListColsNumber(calculateColsNumber(windowWidth));
    }, [windowWidth]);

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
    }, [searchTerm]);

    const calculateColsNumber = (windowWidth: number) => {
        switch (true) {
            case windowWidth <= 620:
                return 1;
            case windowWidth > 620 && windowWidth <= 900:
                return 2;
            case windowWidth > 900 && windowWidth <= 1200:
                return 3;
            case windowWidth > 1200 && windowWidth <= 1500:
                return 4;
            default:
                return 5;
        }
    };

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
        const user = services.authService.userInfo();
        const result = services.userService.addFavouriteMovie(id, user);
        if (result) dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        const user = services.authService.userInfo();
        const result = services.userService.removeFavouriteMovie(id, user);
        if (result) dispatch(removeFavouriteMovie(id));
    };
    const renderList = (): JSX.Element => {
        if (!movies || movies.length === 0) {
            return <CustomError title="Movies not found" />;
        }
        const moviesList = movies.map((movie: IMovieResume, index: number) => {
            return (
                <ImageListItem key={index}>
                    <img src={movie.Poster} alt={movie.Title} />
                    {isLogged && (
                        <Favourite
                            isFavourite={movie.favourite}
                            add={() => addFavourite(movie.imdbID)}
                            remove={() => removeFavourite(movie.imdbID)}
                        />
                    )}
                    <Link to={`/movies/${movie.imdbID}`}>
                        <ImageListItemBar
                            title={movie.Title}
                            subtitle={<span>Year: {movie.Year}</span>}
                        />
                    </Link>
                </ImageListItem>
            );
        });
        return (
            <ImageList
                rowHeight={550}
                cols={gridListColsNumber}
                className={classes.gridList}
            >
                {moviesList}
            </ImageList>
        );
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
                {renderList()}
                {renderPagination()}
            </div>
        );
    };

    return (
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
    );
};

export default MoviesList;
