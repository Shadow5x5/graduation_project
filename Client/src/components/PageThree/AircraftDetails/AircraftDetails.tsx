import {useMemo} from "react";
import {useAppSelector} from "../../../context/hook";
import classes from "./AircraftDetails.module.scss";
import CardDescription from "./CardDescription/CardDescription";
import CardInfo from "./CardInfo/CardInfo";
import {useParams} from "react-router-dom";

const arrayCardInfo = [
    "Количество мест",
    "Высота салона (м)",
    "Объём багажного отделения (куб. м)",
    "Дальность (км)",
    "Максимальный взлетный вес (кг)",
];

const arrayCardsDescription = ["Интерьер", "Цена"];

const AircraftDetails = () => {
    const {aircrafts} = useAppSelector((state) => state);
    const {id} = useParams();
    const aircraft = aircrafts.find((aircraft) => aircraft.id === id);
    const arrayCardInfoValue = useMemo(
        () =>
            aircraft
                ? [
                      aircraft.SeatCapacity,
                      aircraft.CabinHeight,
                      aircraft.CargoVolume,
                      aircraft.Range,
                      aircraft.MaximumFlightAltitude,
                  ]
                : [],
        [aircraft],
    );

    const arrayCardDescriptionValue = useMemo(
        () => (aircraft ? [aircraft.InteriorDescription, aircraft.PriceDescription] : []),
        [aircraft],
    );

    if (!aircraft) {
        return <div>Информация о самолете недоступна.</div>;
    }

    return (
        <div className={classes.block}>
            <div className={classes.blockAbout}>
                {aircraft.BasicDescription.map((item, index) => (
                    <p
                        key={index}
                        className={`${index === 0 ? classes.textBlack : classes.textGrey} text`}>
                        {item}
                    </p>
                ))}
            </div>
            <div className={classes.blockCardsInfo}>
                {arrayCardInfo.map((item, index) => (
                    <CardInfo key={item} designation={item} value={arrayCardInfoValue[index]} />
                ))}
            </div>
            <div className={classes.blockCardDescription}>
                {arrayCardsDescription.map((item, index) => (
                    <CardDescription
                        key={item}
                        designation={item}
                        value={arrayCardDescriptionValue[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default AircraftDetails;
