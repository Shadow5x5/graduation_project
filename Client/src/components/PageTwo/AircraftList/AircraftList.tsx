import AircraftCard from "../AircraftCard/AircraftCard";
import classes from "./AircraftList.module.scss";
import {useAppDispatch, useAppSelector} from "../../../context/hook";
import {useEffect, useRef, useState} from "react";
import {setSelectedAircraft} from "../../../store/aircraftSlice";
import {useNavigate} from "react-router-dom";

const AircraftList = () => {
    const filteredSortedAircrafts = useAppSelector((state) => state.filteredSortedAircrafts);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            const entry = entries[0];
            setContainerWidth(entry.contentRect.width);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);
    const columns = containerWidth < 540 ? 2 : 3;
    const cardWidth = Math.max((containerWidth - columns * 16 + 10 + 8) / columns, 165);
    const cardHeight = (cardWidth * 180) / 288;

    const handleAircraftClick = (id: string) => {
        dispatch(setSelectedAircraft(id));
        navigate(`/aircraft/${id}`);
    };
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={classes.block}
            ref={containerRef}
            onLoad={() => setLoaded(true)}
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(${165}px, ${cardWidth}px))`,
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.3s ease",
            }}>
            {filteredSortedAircrafts.map((item) => (
                <div onClick={() => handleAircraftClick(item.id)} key={item.AircraftName}>
                    <AircraftCard
                        key={item.id}
                        aircraftModel={item.AircraftName}
                        aircraftSizeCategory={item.AircraftCategory}
                        aircraftType={item.Aircraft}
                        imgPath={item.MainImg}
                        width={cardWidth}
                        height={cardHeight}
                    />
                </div>
            ))}
        </div>
    );
};

export default AircraftList;
