import React, { FunctionComponent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styles } from "./SearchBarStyles";

interface ISearchBarProps extends React.HTMLProps<{}> {
    searchTerm: string;
    onSearchValueChange(value: string): void;
}

const SearchBar: FunctionComponent<ISearchBarProps> = (
    props: ISearchBarProps
): JSX.Element => {
    const classes = styles();
    return (
        <div className={classes.searchBarContainer}>
            <SearchIcon className={classes.searchIcon} />
            <input
                className={classes.searchBarInput}
                placeholder="Search"
                value={props.searchTerm}
                spellCheck={false}
                onChange={(e) => props.onSearchValueChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
