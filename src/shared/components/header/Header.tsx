import { AppStore, setIsLogged } from "@/stores/app";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute, moviesRoute } from "@/modules/app.routes";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import authService from "@/modules/auth/infrastructure/services/auth.service";
import { styles } from "./HeaderStyles";

const Header: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);

    const logout = () => {
        authService.instance.logout();
        dispatch(setIsLogged(false));
        navigate("/");
    };

    const renderMenu = (): JSX.Element => {
        if (!isLogged) {
            return (
                <Link to={loginRoute()} className={classes.link}>
                    <Button variant="contained" color="primary" size="large">
                        Log In
                    </Button>
                </Link>
            );
        }
        return (
            <Button
                onClick={logout}
                variant="contained"
                color="primary"
                size="large"
            >
                Log out
            </Button>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.menuContainer}>
                <div className={classes.linkMenu}>
                    <Link to={moviesRoute()} className={classes.link}>
                        <h3 className={classes.logoLink}>Movie Web App</h3>
                    </Link>
                </div>
                <div>{renderMenu()}</div>
            </div>
        </div>
    );
};

export default Header;
