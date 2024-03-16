import AircraftInfo from "../AircraftInfo/AircraftInfo";
import classes from "./SearchResult.module.scss";

import {useAppSelector} from "../../../context/hook";

interface MyComponentProps {
    searchText: string;
    isSmallScreen: boolean;
}

const SearchResult: React.FC<MyComponentProps> = ({searchText, isSmallScreen}) => {
    const {aircrafts} = useAppSelector((state) => state);
    return (
        <>
            {aircrafts.length > 0 && (
                <div
                    className={`${classes.block} ${
                        isSmallScreen ? classes.smallScreenResultBlock : ""
                    } background_search_1`}>
                    <div className={classes.line}></div>
                    <ul className={classes.blockHeaderTable}>
                        <li>Модель</li>
                        <li className={classes.speedListItem}>Скорость</li>
                        <li className={classes.distanceListItem}>Дальность</li>
                        <li className={classes.passengerListItem}>Пассажиры</li>
                    </ul>
                    <>
                        {aircrafts.slice(0, 5).map((item) => {
                            return (
                                <AircraftInfo
                                    key={item.AircraftName}
                                    searchText={searchText}
                                    aircraftName={item.AircraftName}
                                    speedText={item.CruisingSpeed}
                                    distanceText={item.Range}
                                    passengerText={item.SeatCapacity}
                                    typeText={item.AircraftCategory}
                                    aicraftTypeName={item.Aircraft}
                                    id={item.id}
                                />
                            );
                        })}
                    </>
                </div>
            )}
        </>
    );
};

export default SearchResult;
