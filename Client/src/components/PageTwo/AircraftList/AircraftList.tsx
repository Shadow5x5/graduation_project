import AircraftCard from "../AircraftCard/AircraftCard";
import classes from "./AircraftList.module.scss";
import {useAppSelector} from "../../../context/hook";

const AircraftList = () => {
    const {filteredSortedAircrafts} = useAppSelector((state) => state);
    return (
        <div className={classes.block}>
            {filteredSortedAircrafts.map((item) => (
                <AircraftCard
                    key={item.id}
                    aircraftModel={item.AircraftName}
                    aircraftSizeCategory={item.AircraftCategory}
                    aircraftType={item.Aircraft}
                    imgPath={item.MainImg}
                />
            ))}
        </div>
    );
};

export default AircraftList;
