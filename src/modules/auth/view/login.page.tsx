import { FunctionComponent, useState } from "react";

import { IUser } from "../domain/interfaces/user.interface";
import LoginForm from "./components/form/login.form";
import authService from "../infrastructure/services/auth.service";
import { moviesRoute } from "../../app.routes";
import { setIsLogged } from "@/stores/app";
import { styles } from "./login.page.styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: FunctionComponent = (): JSX.Element => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = styles();
    const [hasError, setHasError] = useState(false);

    const onSubmit = (data: IUser) => {
        var result = authService.instance.logIn(data.email, data.password);
        if (result) {
            setHasError(false);
            dispatch(setIsLogged(result));
            navigate(moviesRoute());
        }
        else {
            setHasError(true);
        }
    }

    const renderContent = (): JSX.Element => {
        return (
            <LoginForm onSubmit={onSubmit}></LoginForm>
        );
    };
    const renderErrorMessage = (): JSX.Element | null => {
        if (hasError) {
            return (
                <div className={classes.error}>
                    <span>Sorry, email or password unknown. Please try again.</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {renderErrorMessage()}
                {renderContent()}
            </div>
        </div>
    );
};

export default Login;
