import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../context/hook";
import classes from "./RecommendationsBlock.module.scss";
import RecommendedCard from "./RecommendedCard/RecommendedCard";
import {setSelectedRecommendedAircraft} from "../../../store/aircraftSlice";

const RecommendationsBlock = () => {
    const recommendedAircrafts = useAppSelector((state) => state.recommendedAircrafts);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const handleRecommendedAircraftClick = (id: string) => {
        dispatch(setSelectedRecommendedAircraft(id));
        navigate(`/aircraft/${id}`);
    };
    return (
        <div className={classes.block}>
            <div className={classes.content}>
                <div className={classes.blockText}>
                    <h2>Возможно вам это интересно</h2>
                    <h4>
                        Почерпните знания <br />
                        из рекомендованных статей
                    </h4>
                </div>
                <div className={classes.blockCards}>
                    {recommendedAircrafts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                handleRecommendedAircraftClick(item.id);
                            }}>
                            <RecommendedCard
                                aircraftName={item.AircraftName}
                                imgPath={item.MainImg}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendationsBlock;
