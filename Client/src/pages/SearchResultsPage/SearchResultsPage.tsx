import classes from "./SearchResultsPage.module.scss";
import {useEffect} from "react";
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
    return (
        <div className={classes.container}>
            <SearchBar />
            <div className={classes.block}>
                <FilterBlock />
                <div className={classes.subBlock}>
                    <SortOptions />
                    <AircraftList />
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
