import {useState} from "react";
import classes from "./SortOptions.module.scss";
import {setSortOrder} from "../../../store/aircraftSlice";
import {useAppDispatch} from "../../../context/hook";
const SortOptions = () => {
    const dispatch = useAppDispatch();
    const arrayParameters = ["Скорость", "Дальность", "Количество мест"];
    const [isActiveParameter, setIsActiveParameter] = useState(arrayParameters[0]);
    const [isActive, setIsActive] = useState(false);
    const activeParameter = (Parameter: string) => {
        setIsActiveParameter(Parameter);
        switch (Parameter) {
            case "Дальность":
                dispatch(setSortOrder("Range"));
                break;
            case "Скорость":
                dispatch(setSortOrder("CruisingSpeed"));
                break;
            case "Количество мест":
                dispatch(setSortOrder("MaximumNumberOfPassengers"));
                break;
            default:
                break;
        }
    };
    return (
        <div className={classes.block}>
            <div
                className={classes.textBlock}
                onClick={() => {
                    setIsActive(!isActive);
                }}>
                <span>{isActiveParameter}</span>
                <img src='./images/mark_bottom.svg' alt='' />
            </div>
            <ul className={`${classes.listBlock} background ${isActive ? classes.active : ""}`}>
                {arrayParameters.map((item) => {
                    return (
                        <li
                            key={item}
                            className={`${classes.liParameter} ${
                                item === isActiveParameter ? classes.active : ""
                            } text`}
                            onClick={() => {
                                activeParameter(item);
                            }}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SortOptions;
