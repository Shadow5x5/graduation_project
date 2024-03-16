import {useEffect, useState} from "react";
import "./ThemeSwitcher.scss";
import {ThemeContext} from "../../../context/ThemeContext";
import {useContext} from "react";

const ThemeSwitcher = () => {
    const {setTheme} = useContext(ThemeContext);
    const [isActive, setActive] = useState<boolean>(true);

    useEffect(() => {
        const userPreferredTheme = localStorage.getItem("userPreferredTheme");

        if (userPreferredTheme) {
            setTheme(userPreferredTheme);
            setActive(userPreferredTheme === "dark");
        } else {
            const hour = new Date().getHours();
            const autoTheme = hour >= 7 && hour < 19 ? "light" : "dark";
            setTheme(autoTheme);
            setActive(autoTheme === "dark");
            localStorage.setItem("theme", autoTheme);
        }
    }, []);

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
