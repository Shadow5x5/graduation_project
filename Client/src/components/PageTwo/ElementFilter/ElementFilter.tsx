import {useEffect, useState} from "react";

import classes from "./ElementFilter.module.scss";
import {useAppSelector} from "../../../context/hook";

interface Props {
    textLabel: string;
    onClick?: () => void;
}

const ElementFilter: React.FC<Props> = ({textLabel, onClick}) => {
    const [isActive, setIsActive] = useState(false);
    const selectedCategories = useAppSelector((state) => state.selectedCategories);
    const selectedManufacturers = useAppSelector((state) => state.selectedManufacturers);

    useEffect(() => {
        const isActiveUpdate =
            selectedCategories.includes(textLabel) || selectedManufacturers.includes(textLabel);
        setIsActive(isActiveUpdate);
    }, [selectedCategories, selectedManufacturers, textLabel]);

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
