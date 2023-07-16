import "./MovieDetailInfo.scss";

interface IMovieDetailInfoProps {
    label: string;
    description: string | number;
}

export const MovieDetailInfo = (props: IMovieDetailInfoProps) => {
    const { label, description } = props;
    return (
        <div className="flex movie-detail-info">
            <div className="font-size--large">
                <span>{label}:</span>
            </div>
            <div className="font-size--large">
                <span>{description}</span>
            </div>
        </div>
    );
};
