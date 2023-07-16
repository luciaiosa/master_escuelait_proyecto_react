import "./app.scss";

import { AppStore, setIsLogged } from "@/stores/app";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FunctionComponent, useEffect } from "react";
import { loginRoute, movieDetailRoute, moviesRoute } from "./app.routes";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "@mui/material";
import Footer from "@/shared/components/footer/Footer";
import Header from "@/shared/components/header/Header";
import Login from "./auth/view/login.page";
import MovieDetail from "./movies/view/components/detail/movie.detail";
import MoviesPage from "@/modules/movies/view/movies.page";
import Spinner from "@/shared/components/spinner/Spinner";
import authService from "./auth/infrastructure/services/auth.service";
import { styles } from "./app.styles";

const App: FunctionComponent = () => {
    const state = useSelector<AppStore, AppStore>((state: AppStore) => state);
    const loading = state.movieStore.loading;
    const dispatch = useDispatch();
    const classes = styles();

    useEffect(() => {
        dispatch(setIsLogged(authService.instance.isLogged()));
    }, []);

    return (
        <div className={classes.body}>
            {loading ? <Spinner /> : null}
            <BrowserRouter>
                <Header />
                <Container
                    maxWidth="xl"
                    style={{ paddingBottom: "5.5em" }}
                >
                    <Routes>
                        <Route path="/" element={<Navigate to={moviesRoute()} />} />
                        <Route path={loginRoute()} element={<Login />} />
                        <Route path={moviesRoute()} element={<MoviesPage />} />
                        <Route
                            path={movieDetailRoute()}
                            element={<MovieDetail />}
                        />
                    </Routes>
                </Container>
                <Footer content="❮❯ 2023" />
            </BrowserRouter>
        </div>
    );
};

export default App;
