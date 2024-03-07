import classes from "./SearchResultsSection.module.scss";
import {useState, useEffect} from "react";
import SearchResult from "../SearchResult/SearchResult";
import TextInputWithButtons from "../TextInputWithButtons/TextInputWithButtons";
import {useAppDispatch} from "../../../context/hook";
import {fetchAircrafts} from "../../../store/previewSlice";

const SearchResultsSection = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAircrafts(inputValue));
    }, [inputValue]);
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length !== 0) {
            setIsSmallScreen(window.innerWidth <= 600);
        } else {
            setIsSmallScreen(false);
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
                    />
                    <TextInputWithButtons
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        setIsSmallScreen={setIsSmallScreen}
                    />
                </div>
                <button className={classes.findButton}>Найти</button>
            </div>
            <SearchResult searchText={inputValue} isSmallScreen={isSmallScreen} />
        </div>
    );
};

export default SearchResultsSection;
