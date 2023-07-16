import { FunctionComponent, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "@components/spinner/Spinner";
import { Container } from "@mui/material";
import { setIsLogged } from "@stores/app";
import Login from "@containers/login/Login";
import { loginRoute, movieDetailRoute, homeRoute } from "@config/routes";
import MovieDetail from "../movie-detail/MovieDetail";
import Home from "@containers/home/Home";
import { styles } from "./AppStyles";
import "./App.scss";
import services from "@/services";
import { IAppStore } from "@/common/interfaces";

const App: FunctionComponent = () => {
    const state = useSelector<IAppStore, IAppStore>((state: IAppStore) => state);
    const loading = state.movieStore.loading;
    const dispatch = useDispatch();
    const classes = styles();

    useEffect(() => {
        dispatch(setIsLogged(services.authService.isLogged()));
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
                        <Route path={loginRoute()} element={<Login />} />
                        <Route path={homeRoute()} element={<Home />} />
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
