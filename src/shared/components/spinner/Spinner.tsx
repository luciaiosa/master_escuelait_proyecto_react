import { FunctionComponent } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useStyles } from './SpinnerStyle';

const Spinner: FunctionComponent = () => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Spinner;
