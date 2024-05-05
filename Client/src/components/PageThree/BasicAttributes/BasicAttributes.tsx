import {useMemo} from "react";
import {useAppSelector} from "../../../context/hook";
import classes from "./BasicAttributes.module.scss";

const BasicAttributes = () => {
    const selectedAircraft = useAppSelector((state) => state.selectedAircraft);
    const aircraft = selectedAircraft;
    const arrayTypeFirst = [
        "Крейсерская скорость (км/ч)",
        "Дальность (км)",
        "Максимальная высота полета (м)",
        "Длина самолета (м)",
        "Высота самолета (м)",
        "Размах крыла (м)",
        "Максимальный взлетный вес (кг)",
        "Максимальное число пассажиров",
    ];
    const arrayTypeSecond = ["Ширина салона (м)", "Высота салона (м)", "Объем салона (куб.м.)"];
    const arrayValueFirst = useMemo(
        () =>
            aircraft
                ? [
                      aircraft.CruisingSpeed,
                      aircraft.Range,
                      aircraft.MaximumFlightAltitude,
                      aircraft.AircraftLength,
                      aircraft.AircraftHeight,
                      aircraft.Wingspan,
                      aircraft.MaxTakeoffWeight,
                      aircraft.MaximumNumberOfPassengers,
                  ]
                : [],
        [aircraft],
    );

    const arrayValueSecond = useMemo(
        () => (aircraft ? [aircraft.CabinWidth, aircraft.CabinHeight, aircraft.CabinVolume] : []),
        [aircraft],
    );
    return (
        <div className={classes.block}>
            <div>
                <h2 className='text'>Основные характеристики</h2>
                <ul className={classes.itemsFirst}>
                    {arrayValueFirst.map((item, index) => {
                        return (
                            <li key={item + index}>
                                <p className='background'>{arrayTypeFirst[index]}</p>
                                <span className='text background'>{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <h2 className='text'>Габариты салона</h2>
                <ul className={classes.itemsSecond}>
                    {arrayValueSecond.map((item, index) => {
                        return (
                            <li key={item}>
                                <p className='background'>{arrayTypeSecond[index]}</p>
                                <span className='text background'>{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BasicAttributes;
