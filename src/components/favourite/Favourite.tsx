import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import "./Favourite.scss";

interface IFavouriteProps {
    isFavourite: boolean;
    add(): void;
    remove(): void;
}

export const Favourite = (props: IFavouriteProps) => {
    const { isFavourite, add, remove } = props;
    const renderFavourite = (isFavourite: boolean) => {
        if (!isFavourite) {
            return (
                <StarBorderIcon
                    fontSize="large"
                    onClick={add}
                    className="icon"
                />
            );
        }
        return <StarIcon fontSize="large" onClick={remove} className="icon" />;
    };
    return <div className="favourite-icon">{renderFavourite(isFavourite)}</div>;
};
