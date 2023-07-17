import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    Divider,
    Typography,
} from "@mui/material";

import userService from "@/modules/user-profile/infrastructure/services/user.service";
import authService from "@/modules/auth/infrastructure/services/auth.service";
import { moviesRoute } from "@/modules/app.routes";
import { MovieStore, clearSelectedMovie, getMovieByIdRequest, removeFavouriteMovie, setFavouriteMovie } from "@/stores/movies";
import { AppStore } from "@/stores/app";
import CustomError from "@/shared/components/error/Error";
import { Favourite } from "@/shared/components/favourite/Favourite";
import { Rating } from "@/shared/types/rating";
import { Ratings } from "@/shared/components/ratings/Ratings";
import { MovieDetailInfo } from "../detail-info/movie.detail.info";
import "./movie.detail.scss";

const MovieDetail: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const { selectedMovie, hasError, errorMessage } = useSelector<
        AppStore,
        MovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);
    const { id }= useParams() 

    useEffect(() => {
        dispatch(getMovieByIdRequest(id));
        return () => {
            dispatch(clearSelectedMovie());
        };
    }, [dispatch]);

    const addFavourite = (id: string) => {
        const user = authService.instance.userInfo();
        userService.instance.addFavouriteMovie(id, user);
        dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        const user = authService.instance.userInfo();
        userService.instance.removeFavouriteMovie(id, user);
        dispatch(removeFavouriteMovie(id));
    };

    const renderRatings = (ratings: Rating[]) => {
        if (ratings && ratings.length > 0) {
            return <Ratings ratings={ratings} />;
        }
        return null;
    };

    const renderDetail = () => {
        if (hasError) {
            return <CustomError title={errorMessage}></CustomError>;
        }
        if (selectedMovie) {
            return (
                <div>
                    <Card className="flex movie-detail-card">
                        <div className="movie-image">
                            <img src={selectedMovie!.Poster} />
                            {isLogged && (
                                <Favourite
                                    isFavourite={selectedMovie.favourite}
                                    add={() =>
                                        addFavourite(selectedMovie.imdbID)
                                    }
                                    remove={() =>
                                        removeFavourite(selectedMovie.imdbID)
                                    }
                                />
                            )}
                        </div>
                        <div className="movie-detail-card-content">
                            <div className="movie-detail-info-header-container">
                                <Typography component="h5" variant="h5">
                                    {selectedMovie.Title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    {selectedMovie.Director} (
                                    {selectedMovie.Country}),{" "}
                                    {selectedMovie.Year}
                                </Typography>
                            </div>
                            <Divider />
                            <div className="movie-detail-info-container">
                                <div className="info">
                                    <MovieDetailInfo
                                        label="Genre"
                                        description={selectedMovie.Genre}
                                    />
                                    <MovieDetailInfo
                                        label="Duration"
                                        description={selectedMovie.Runtime}
                                    />
                                    <MovieDetailInfo
                                        label="Released"
                                        description={selectedMovie.Released}
                                    />
                                    <MovieDetailInfo
                                        label="Actors"
                                        description={selectedMovie.Actors}
                                    />
                                    <MovieDetailInfo
                                        label="Awards"
                                        description={selectedMovie.Awards}
                                    />
                                    <MovieDetailInfo
                                        label="Rated"
                                        description={selectedMovie.Rated}
                                    />
                                    <MovieDetailInfo
                                        label="Writer"
                                        description={selectedMovie.Writer}
                                    />
                                    <MovieDetailInfo
                                        label="Language"
                                        description={selectedMovie.Language}
                                    />
                                    <MovieDetailInfo
                                        label="Metascore"
                                        description={selectedMovie.Metascore}
                                    />
                                    <MovieDetailInfo
                                        label="DVD"
                                        description={selectedMovie.DVD}
                                    />
                                    <MovieDetailInfo
                                        label="BoxOffice"
                                        description={selectedMovie.BoxOffice}
                                    />
                                    <MovieDetailInfo
                                        label="Production"
                                        description={selectedMovie.Production}
                                    />
                                    <MovieDetailInfo
                                        label="Website"
                                        description={selectedMovie.Website}
                                    />
                                </div>
                                <div className="info">
                                    {renderRatings(selectedMovie.Ratings)}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="movie-detail-card-description">
                        <div>
                            <Typography component="h5" variant="h5">
                                Description
                            </Typography>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="subtitle1" color="textPrimary">
                                {selectedMovie.Plot}
                            </Typography>
                        </div>
                    </Card>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="movie-detail">
            <div>
                <Link to={moviesRoute()} className="link">
                    <Button variant="contained" color="primary" size="large">
                        Back to list
                    </Button>
                </Link>
            </div>
            <div>{renderDetail()}</div>
        </div>
    );
};

export default MovieDetail;
