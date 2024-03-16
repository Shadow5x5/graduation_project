import AircraftCard from "../AircraftCard/AircraftCard";
import classes from "./AircraftList.module.scss";
import {useAppSelector} from "../../../context/hook";
import {NavLink} from "react-router-dom";

const AircraftList = () => {
    const {filteredSortedAircrafts} = useAppSelector((state) => state);
    return (
        <div className={classes.block}>
            {filteredSortedAircrafts.map((item) => (
                <NavLink to={`/aircraft/${item.id}`} key={item.id} style={{textDecoration: "none"}}>
                    <AircraftCard
                        key={item.id}
                        aircraftModel={item.AircraftName}
                        aircraftSizeCategory={item.AircraftCategory}
                        aircraftType={item.Aircraft}
                        imgPath={item.MainImg}
                    />
                </NavLink>
            ))}
        </div>
    );
};

export default AircraftList;
