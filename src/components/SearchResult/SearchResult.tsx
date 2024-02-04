import "./SearchResult.scss";

const SearchResult = () => {
    return (
        <div className="resultsBlock">
            <div className="line"></div>
            <ul className="columnHeaderTable">
                <li>Модель</li>
                <li>Скорость</li>
                <li>Дальность</li>
                <li>Пассажиры</li>
            </ul>
            <div className="resultBlock text">
                <div>
                    <span>Cessna Citation I</span>
                    <div>
                        <span>Самолёт</span>
                        <span>
                            <img src="./images/circle.svg" alt="" />
                        </span>
                        <span>Лёгкая категория</span>
                    </div>
                </div>
                <li>1145 км/ч</li>
                <li>1102 км</li>
                <li>15-17</li>
            </div>
        </div>
    );
};

export default SearchResult;
