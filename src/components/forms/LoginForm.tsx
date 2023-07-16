import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "@containers/login/Login";
import { Button } from "@material-ui/core";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";

interface ILoginFormProps {
    onSubmit(data: IUser): void;
}

const LoginForm: FunctionComponent<ILoginFormProps> = (props): JSX.Element => {
    const { handleSubmit, register, errors } = useForm();
    const navigate = useNavigate();

    const onSubmit = (values: any) => {
        props.onSubmit(values);
    };

    const onCancel = () => {
        navigate(-1);
    };

    const labelFieldClassName = (field: string) => errors && errors[field] ? "field-label-invalid" : "label";
    const inputFieldClassName = (field: string) => errors && errors[field] ? "field-input-invalid" : "input";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-form-container"
        >
            <p className="form-title">Log in</p>
            <div className="field-container">
                <label className={labelFieldClassName("email")}>Email*</label>
                <input
                    className={inputFieldClassName("email")}
                    name="email"
                    type="text"
                    placeholder="Email:"
                    aria-invalid={errors?.email ? "true" : "false"}
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                <span className="error">
                    {errors?.email && errors?.email?.message}
                </span>
            </div>
            <div className="field-container">
                <label className={labelFieldClassName("password")}>
                    Password*
                </label>
                <input
                    className={inputFieldClassName("password")}
                    name="password"
                    type="password"
                    placeholder="Password:"
                    maxLength={30}
                    aria-invalid={errors?.password ? "true" : "false"}
                    {...register('password', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]{1,30}$/i,
                            message: "Max length 30 characters",
                    }, })}
                />
                <span className="error">
                    {errors?.password && errors?.password?.message}
                </span>
            </div>

            <div className="buttons-group">
                <Button
                    type="submit"
                    className="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    className="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};
export default LoginForm;
