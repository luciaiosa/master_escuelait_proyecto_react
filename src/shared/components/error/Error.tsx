import { FunctionComponent } from "react";
import { styles } from "./ErrorStyles";

interface IErrorProps {
    title: string;
}

const CustomError: FunctionComponent<IErrorProps> = (
    props: IErrorProps
): JSX.Element => {
    const classes = styles();

    return (
        <div className={classes.content}>
            <h2>{props.title}</h2>
        </div>
    );
};

export default CustomError;
