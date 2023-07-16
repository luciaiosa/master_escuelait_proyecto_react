import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";

export const styles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            overflow: "hidden",
            backgroundColor: "#fff",
            flexDirection: "column",
            minHeight: "75vh",
            height: "100vh"
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            overflow: "hidden",
            flexDirection: "column"
        },
        description: {
            fontSize: "1.1rem",
        },
        descriptionRow: {
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        message: {
            height: 70,
            fontSize: "1.5rem",
            lineHeight: "1.4em",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            margin: 5,
            paddingLeft: 15,
            marginTop: 15,
            marginBottom: 15
        },
        blankDiv: {
            height: 50
        },
        contentFollowLink: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        },
        center: {
            margin: 0
        },
        error: {
            color: "red",
            border: "1px solid red",
            padding: 20,
            textAlign: "center",
            marginTop: 40
        }
    })
);
