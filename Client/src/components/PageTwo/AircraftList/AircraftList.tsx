import AircraftCard from "../AircraftCard/AircraftCard";
import classes from "./AircraftList.module.scss";
import {useAppSelector} from "../../../context/hook";
import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const AircraftList = () => {
    const {filteredSortedAircrafts} = useAppSelector((state) => state);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

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
    return (
        <div
            className={classes.block}
            ref={containerRef}
            style={{gridTemplateColumns: `repeat(${columns}, minmax(${165}px, ${cardWidth}px))`}}>
            {filteredSortedAircrafts.map((item) => (
                <NavLink
                    to={`/aircraft/${item.id}`}
                    key={item.id}
                    style={{
                        textDecoration: "none",
                    }}>
                    <AircraftCard
                        key={item.id}
                        aircraftModel={item.AircraftName}
                        aircraftSizeCategory={item.AircraftCategory}
                        aircraftType={item.Aircraft}
                        imgPath={item.MainImg}
                        width={cardWidth}
                        height={cardHeight}
                    />
                </NavLink>
            ))}
        </div>
    );
};

export default AircraftList;
