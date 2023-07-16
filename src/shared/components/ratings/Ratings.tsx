import { IRating } from "@/common/interfaces";
import "./Ratings.scss";

interface IRatingProps {
    ratings: IRating[];
}

export const Ratings = (props: IRatingProps) => {
    const { ratings } = props;
    const renderRating = (ratings: IRating[]): JSX.Element[] => {
        return ratings.map((rating: IRating, index: number) => {
            return (
                <div className="flex rating" key={`ratingmovie${index}`}>
                    <div className="source">
                        <span>{rating.Source}:</span>
                    </div>
                    <div className="value">
                        <span>{rating.Value}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-direction--column ratings-container">
            <div className="ratings-title">Ratings</div>
            <div>{renderRating(ratings)}</div>
        </div>
    );
};
