import classes from "./SearchResultsSection.module.scss";
import {useState, useEffect} from "react";
import SearchResult from "../SearchResult/SearchResult";
import TextInputWithButtons from "../TextInputWithButtons/TextInputWithButtons";
import {useAppDispatch} from "../../../context/hook";
import {fetchAircrafts} from "../../../store/aircraftSlice";
import {NavLink, useNavigate} from "react-router-dom";
const SearchResultsSection = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAircrafts(inputValue));
    }, [inputValue, dispatch]);
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length !== 0) {
            setIsSmallScreen(window.innerWidth <= 600);
        } else {
            setIsSmallScreen(false);
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            dispatch(fetchAircrafts(inputValue));
            navigate("/search");
        }
    };
    return (
        <div
            className={`${classes.block} ${
                isSmallScreen ? `${classes.smallScreen} background_search_2` : "background_search_1"
            }`}>
            <div
                className={`${classes.searchBlock} ${
                    isSmallScreen ? "background_search_1 background_search_3" : ""
                } `}>
                <div className={classes.inputBlock}>
                    <input
                        type='text'
                        placeholder='Модель летательного аппарата'
                        className='text'
                        value={inputValue}
                        onChange={onChangeText}
                        onKeyDown={handleKeyDown}
                    />
                    <TextInputWithButtons
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        setIsSmallScreen={setIsSmallScreen}
                    />
                </div>
                <NavLink to='/search' className={classes.findButton}>
                    Найти
                </NavLink>
            </div>
            <SearchResult searchText={inputValue} isSmallScreen={isSmallScreen} />
        </div>
    );
};

export default SearchResultsSection;
