import classes from "./DetailPage.module.scss";
import AircraftDetails from "../../components/PageThree/AircraftDetails/AircraftDetails";
import Header from "../../components/PageThree/Header/Header";
import InfiniteSlider from "../../components/PageThree/InfiniteSlider/InfiniteSlider";
import BasicAttributes from "../../components/PageThree/BasicAttributes/BasicAttributes";
import {useEffect} from "react";
import {useAppSelector} from "../../context/hook";
import {useNavigate, useParams} from "react-router-dom";
const DetailPage = () => {
    const navigate = useNavigate();
    const {aircrafts} = useAppSelector((state) => state);
    const {id} = useParams();
    const aircraft = aircrafts.find((aircraft) => aircraft.id === id);
    useEffect(() => {
        if (!aircraft) {
            navigate("/search", {replace: true});
        }
    }, [aircraft, navigate]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={classes.block}>
            <div className={classes.container}>
                <Header />
                <AircraftDetails />
            </div>
            <InfiniteSlider />
            <div className={classes.container}>
                <BasicAttributes />
            </div>
        </div>
    );
};

export default DetailPage;
