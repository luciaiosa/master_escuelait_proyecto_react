import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {
    Card,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import {
    getMovieByIdRequest,
    clearSelectedMovie,
    setFavouriteMovie,
    removeFavouriteMovie
} from "@stores/movies";
import { homeRoute } from "@config/routes";
import { Favourite } from "@components/favourite/Favourite";
import { Ratings } from "@components/ratings/Ratings";
import CustomError from "@components/error/Error";
import services from "@/services";
import "./MovieDetail.scss";
import { MovieDetailInfo } from "@/components/movie-detail-info/MovieDetailInfo";
import { IAppStore, IMovieStore, IRating } from "@/common/interfaces";


const MovieDetail: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const { selectedMovie, hasError, errorMessage } = useSelector<
        IAppStore,
        IMovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<IAppStore, boolean>((state) => state.isLogged);
    const { id }= useParams() 

    useEffect(() => {
        dispatch(getMovieByIdRequest(id));
        return () => {
            dispatch(clearSelectedMovie());
        };
    }, [dispatch]);

    const addFavourite = (id: string) => {
        const user = services.authService.userInfo();
        services.userService.addFavouriteMovie(id, user);
        dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        const user = services.authService.userInfo();
        services.userService.removeFavouriteMovie(id, user);
        dispatch(removeFavouriteMovie(id));
    };

    const renderRatings = (ratings: IRating[]) => {
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
                <Link to={homeRoute()} className="link">
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
