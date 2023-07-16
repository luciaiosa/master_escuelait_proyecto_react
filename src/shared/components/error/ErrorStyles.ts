import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";

export const styles = makeStyles(() =>
    createStyles({
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            /* border: "1px solid #1dc9dd", */
            margin: 35
        }
    })
);
