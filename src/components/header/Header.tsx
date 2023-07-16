import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./HeaderStyles";
import { homeRoute, loginRoute } from "@config/routes";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "@stores/app";
import services from "@/services";
import { IAppStore } from "@/common/interfaces";

const Header: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector<IAppStore, boolean>((state) => state.isLogged);

    const logout = () => {
        services.authService.logout();
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
                    <Link to={homeRoute()} className={classes.link}>
                        <h3 className={classes.logoLink}>Movie Web App</h3>
                    </Link>
                </div>
                <div>{renderMenu()}</div>
            </div>
        </div>
    );
};

export default Header;
