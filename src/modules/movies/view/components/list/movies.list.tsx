import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'

import { MovieResume } from "@/modules/movies/domain/entities/movies.entity";
import { AppStore } from "@/stores/app";
import CustomError from "@/shared/components/error/Error";
import { Favourite } from "@/shared/components/favourite/Favourite";
import { useWindowResize } from "@/shared/hooks/useWindowResize";
import { MIN_COLS_NUMBER } from "@/shared/constants";
import { styles } from "./movies.list.styles";

interface IMoviesListProps {
    movies: MovieResume[];
    addFavourite(id: string): void;
    removeFavourite(id: string): void;
}

const MoviesList: FunctionComponent<IMoviesListProps> = (props): JSX.Element => {
    const classes = styles();
    const windowWidth = useWindowResize().width;
    const [gridListColsNumber, setGridListColsNumber] = useState(MIN_COLS_NUMBER);
    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);

    useEffect(() => {
        setGridListColsNumber(calculateColsNumber(windowWidth));
    }, [windowWidth]);

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

    const renderList = (): JSX.Element => {
        const { movies, addFavourite, removeFavourite } = props;
        if (!movies || movies.length === 0) {
            return <CustomError title="Movies not found" />;
        }
        const moviesList = movies.map((movie: MovieResume, index: number) => {
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

    return (
        <>{renderList()}</>
    )
};

export default MoviesList;
