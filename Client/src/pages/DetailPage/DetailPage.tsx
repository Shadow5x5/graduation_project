import classes from "./DetailPage.module.scss";
import AircraftDetails from "../../components/PageThree/AircraftDetails/AircraftDetails";
import Header from "../../components/PageThree/Header/Header";
import InfiniteSlider from "../../components/PageThree/InfiniteSlider/InfiniteSlider";
import BasicAttributes from "../../components/PageThree/BasicAttributes/BasicAttributes";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../context/hook";
import {useNavigate, useParams} from "react-router-dom";
import RecommendationsBlock from "../../components/PageThree/RecommendationsBlock/RecommendationsBlock";
import {fetchRecommendedAircrafts} from "../../store/aircraftSlice";

const DetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selectedAircraft = useAppSelector((state) => state.selectedAircraft);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchRecommendedAircrafts(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedAircraft?.id !== id) {
            navigate("/search", {replace: true});
        }
    }, [selectedAircraft, navigate, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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
            <RecommendationsBlock />
        </div>
    );
};

export default DetailPage;
