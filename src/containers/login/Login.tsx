import { FunctionComponent, useState } from "react";
import { styles } from "./LoginStyles";
import LoginForm from "@components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { setIsLogged } from '@stores/app/Actions';
import { useDispatch } from "react-redux";
import { homeRoute } from "@config/routes";
import services from "@/services";

export interface IUser {
    email: string;
    password: string;
}

const Login: FunctionComponent = (): JSX.Element => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = styles();
    const [hasError, setHasError] = useState(false);

    const onSubmit = (data: IUser) => {
        var result = services.authService.logIn(data.email, data.password);
        if (result) {
            setHasError(false);
            dispatch(setIsLogged(result));
            navigate(homeRoute());
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
