import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";

export const styles = makeStyles(() =>
    createStyles({
        formTitle: {
            display: "block",
            width: "100%",
            padding: 0,
            marginBottom: 40,
            fontSize: 21,
            lineHeight: "inherit",
            color: "#333",
            border: 0,
            borderBottom: "1px solid #e5e5e5",
            textAlign: "center",
        },
        fieldContainer: {
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        },
        fieldLabelInvalid: {
            color: "red",
            marginBottom: 5,
            fontWeight: 700,
        },
        fieldInputInvalid: {
            border: "1px solid red",
            backgroundColor: "salmon",
            font: "inherit",
            padding: "6px 12px",
            boxSizing: "border-box",
        },
        label: {
            marginBottom: 5,
            fontWeight: 700,
            color: "#4e4e4e",
        },
        input: {
            font: "inherit",
            padding: "6px 12px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            "&:focus": {
                outline: "none",
                border: "1px solid #521751",
                backgroundColor: "#eee",
            },
        },
        error: {
            color: "red",
        },
        flex: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            backgroundColor: "#3782a3",
            color: "white",
            padding: ".42857em .85714em",
            textTransform: "uppercase",
            fontSize: 16,
            width: 150,
            borderRadius: 5,
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: 20,
        },
    })
);
