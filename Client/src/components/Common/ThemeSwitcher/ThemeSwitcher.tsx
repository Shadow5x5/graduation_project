import {useEffect, useState, useContext} from "react";
import SunCalc from "suncalc";
import {ThemeContext} from "../../../context/ThemeContext";
import "./ThemeSwitcher.scss";

const ThemeSwitcher = () => {
    const {setTheme} = useContext(ThemeContext);
    const [isActive, setActive] = useState(true);

    useEffect(() => {
        const userPreferredTheme = localStorage.getItem("userPreferredTheme");

        const setAutoThemeBasedOnSunTimes = (latitude: number, longitude: number) => {
            const now = new Date();
            console.log(latitude, longitude)
            const sunTimes = SunCalc.getTimes(now, latitude, longitude);
            console.log(sunTimes);
            const isDaytime = now >= sunTimes.sunrise && now < sunTimes.sunset;
            console.log(isDaytime);
            const autoTheme = isDaytime ? "light" : "dark";
            setTheme(autoTheme);
            setActive(autoTheme === "dark");
            localStorage.setItem("theme", autoTheme);
        };

        if (userPreferredTheme) {
            setTheme(userPreferredTheme);
            setActive(userPreferredTheme === "dark");
        } else {
            // Попытка получить местоположение пользователя
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setAutoThemeBasedOnSunTimes(
                            position.coords.latitude,
                            position.coords.longitude,
                        );
                    },
                    () => {
                        console.error("Не удалось получить местоположение пользователя");
                        setAutoThemeBasedOnSunTimes(59.9343, 30.3351);
                    },
                );
            } else {
                console.error("Geolocation не поддерживается этим браузером");
                setAutoThemeBasedOnSunTimes(59.9343, 30.3351);
            }
        }
    }, [setTheme]);

    const toggleTheme = () => {
        const newTheme = isActive ? "light" : "dark";
        setTheme(newTheme);
        setActive(!isActive);
        localStorage.setItem("theme", newTheme);
        localStorage.setItem("userPreferredTheme", newTheme);
    };

    return (
        <div className='themeSwitcherBlock'>
            <span onClick={toggleTheme} className={`moon ${!isActive ? "active" : ""}`}>
                <img src='/images/moon.svg' alt='' />
            </span>
            <span onClick={toggleTheme} className={`sun ${isActive ? "active" : ""}`}>
                <img src='/images/sun.svg' alt='' />
            </span>
        </div>
    );
};

export default ThemeSwitcher;
