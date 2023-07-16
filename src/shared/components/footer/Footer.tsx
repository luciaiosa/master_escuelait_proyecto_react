import { FunctionComponent } from "react";
import "./Footer.scss";

interface IFooterProps {
    content: string;
}
const Footer: FunctionComponent<IFooterProps> = (
    props: IFooterProps
): JSX.Element => {
    return (
        <div className="flex flex-direction--column footer-container">
            <span className="content">{props.content}</span>
        </div>
    );
};

export default Footer;
