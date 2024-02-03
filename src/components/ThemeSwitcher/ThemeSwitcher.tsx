import { useState } from "react";
import "./ThemeSwitcher.scss";
import { ThemeContext } from "./../../context/ThemeContext";
import { useContext } from "react";

const ThemeSwitcher = () => {
    const {setTheme } = useContext(ThemeContext);
    const [isActive, setActive] = useState<boolean>(true);
    const toggleTheme = () => {
        if(!isActive){
            setTheme("light");
        }
        else{
            setTheme("dark");
        }
        setActive(!isActive);
    };
    return (
        <div className="themeSwitcherBlock">
            <span
                onClick={toggleTheme}
                className={`moon ${isActive ? "active" : ""}`}>
                <img src="./images/moon.svg" alt="" />
            </span>
            <span
                onClick={toggleTheme}
                className={`sun ${!isActive ? "active" : ""}`}>
                <img src="./images/sun.svg" alt="" />
            </span>
        </div>
    );
};

export default ThemeSwitcher;
