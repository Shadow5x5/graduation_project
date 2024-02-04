import "./SearchResultsSection.scss";
import { useState } from "react";
import SearchResult from "../SearchResult/SearchResult";
const SearchResultsSection = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isActive, setActive] = useState<boolean>(false);
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            setActive(false);
        } else {
            setActive(true);
        }
        setInputValue(e.target.value);
    };
    const handleClearInput = () => {
        setInputValue("");
        setActive(false);
    };
    return (
        <div className="searchResultsBlock background_search">
            <div className="searchBlock">
                <div className="inputBlock">
                    <input
                        type="text"
                        placeholder="Модель летательного аппарата"
                        className="text"
                        value={inputValue}
                        onChange={onChangeText}
                    />
                    <button
                        className={isActive ? "active" : ""}
                        onClick={handleClearInput}>
                        <img src="./images/x.svg" alt="" />
                    </button>
                </div>
                <button>Найти</button>
            </div>
            <SearchResult />
        </div>
    );
};

export default SearchResultsSection;
