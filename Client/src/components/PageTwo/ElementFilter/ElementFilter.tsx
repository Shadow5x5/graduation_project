import {useState} from "react";

import classes from "./ElementFilter.module.scss";

interface Props {
    textLabel: string;
    onClick?: () => void;
}

const ElementFilter: React.FC<Props> = ({textLabel, onClick}) => {
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        setIsActive(!isActive);
        onClick && onClick();
    };

    return (
        <div className={classes.block} onClick={toggleButton}>
            <div className={`${classes.imgCheckbox} ${isActive ? classes.active : ""}`}>
                <img src='./images/check_mark.svg' alt='' />
            </div>
            <span className={`${classes.textCheckbox} text`}>{textLabel}</span>
        </div>
    );
};

export default ElementFilter;
