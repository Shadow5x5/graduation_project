import {useState} from "react";
import MainIcon from "../../Common/MainIcon/MainIcon";
import classes from "./SearchBar.module.scss";
import {useAppDispatch} from "./../../../context/hook";
import BlockButtons from "./BlockButtons/BlockButtons";
import ThemeSwitcher from "../../Common/ThemeSwitcher/ThemeSwitcher";
import {fetchAircrafts} from "./../../../store/aircraftSlice";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const dispatch = useAppDispatch();
    const searchAircraft = () => {
        dispatch(fetchAircrafts(inputValue));
    };
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            searchAircraft();
        }
    };
    return (
        <div className={classes.container}>
            <div className={classes.mainIconHide}>
                <MainIcon />
            </div>
            <div className={classes.content}>
                <div className={classes.inputBlock}>
                    <input
                        type='text'
                        placeholder='Модель летательного аппарата'
                        className='text'
                        value={inputValue}
                        onChange={onChangeText}
                        onKeyDown={handleKeyDown}
                    />
                    <BlockButtons inputValue={inputValue} setInputValue={setInputValue} />
                </div>
                <button className={classes.findButton} onClick={searchAircraft}>
                    Найти
                </button>
            </div>
            <ThemeSwitcher />
        </div>
    );
};

export default SearchBar;
