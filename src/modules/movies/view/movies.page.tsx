import { FunctionComponent } from "react";
import MoviesList from "@/modules/movies/view/components/list/movies.list";
import { styles } from "./moviles.page.styles";

const MoviesPage: FunctionComponent = (): JSX.Element => {
    const classes = styles();

    return (
        <div className={classes.root}>
            <MoviesList />
        </div>
    );
};

export default MoviesPage;
