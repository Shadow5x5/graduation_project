import classes from "./SearchResultsPage.module.scss";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../context/hook";

import {
    fetchMaxPassengerCapacity,
    fetchAircraftCategories,
    fetchAircraftManufacturers,
} from "../../store/aircraftSlice";

import SearchBar from "../../components/PageTwo/SearchBar/SearchBar";
import FilterBlock from "../../components/PageTwo/FilterBlock/FilterBlock";
import SortOptions from "../../components/PageTwo/SortOptions/SortOptions";
import AircraftList from "../../components/PageTwo/AircraftList/AircraftList";
const SearchResultsPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAircraftCategories());
        dispatch(fetchMaxPassengerCapacity());
        dispatch(fetchAircraftManufacturers());
    }, [dispatch]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const initialGap = 94;
    const minGap = 48;
    const [columnGap, setColumnGap] = useState(initialGap);
    const [initialWidth, setInitialWidth] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && initialWidth !== null) {
                const currentWidth = containerRef.current.offsetWidth;
                const widthDifference = Math.abs(initialWidth - currentWidth);
                let newGap = initialGap - widthDifference;
                newGap = Math.max(minGap, Math.min(newGap, 94));
                setColumnGap(newGap);
            }
        };

        if (containerRef.current && initialWidth === null) {
            setInitialWidth(containerRef.current.offsetWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [initialWidth]);
    const [leftValue, setLeftValue] = useState(-100);

    const toggleLeft = () => {
        setLeftValue(leftValue === 0 ? -100 : 0);
    };
    return (
        <div className={classes.container}>
            <SearchBar />
            <div className={classes.block} ref={containerRef} style={{columnGap: `${columnGap}px`}}>
                <FilterBlock leftValue={leftValue} toggleLeft={toggleLeft} />
                <div className={classes.subBlock}>
                    <div className={classes.blockOptions}>
                        <button className='text' onClick={toggleLeft}>
                            <img
                                src='./images/icons_settings.svg'
                                alt=''
                                className='button_mic_light'
                            />
                            <img
                                src='./images/icons_settings_white.svg'
                                alt=''
                                className='button_mic_dark'
                            />
                            Фильтры
                        </button>
                        <SortOptions />
                    </div>
                    <AircraftList />
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
