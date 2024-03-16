import {useNavigate} from "react-router-dom";
import classes from "./AircraftInfo.module.scss";
import {useEffect, useState} from "react";

interface MyComponentProps {
    searchText: string;
    speedText: string;
    distanceText: string;
    passengerText: string;
    aircraftName: string;
    typeText: string;
    aicraftTypeName: string;
    id: string;
}

const AircraftInfo: React.FC<MyComponentProps> = ({
    searchText,
    aircraftName,
    aicraftTypeName,
    speedText,
    distanceText,
    passengerText,
    typeText,
    id,
}) => {
    const navigate = useNavigate();
    const [highlightedValue, setHighlightedValue] = useState("");

    useEffect(() => {
        highlightText(searchText);
    }, [searchText]);

    const highlightText = (textInput: string) => {
        const nameAircraft: string = aircraftName;
        const regex = new RegExp(`(${textInput})`, "gi");
        setHighlightedValue(nameAircraft.replace(regex, "<span>$1</span>"));
    };
    const handleSearch = (id: number) => {
        navigate(`aircraft/${id}`);
    };
    return (
        <div
            className={`${classes.block} text`}
            onClick={() => {
                handleSearch(Number(id));
            }}
            style={{cursor: "pointer"}}>
            <div>
                <span
                    className={`${classes.aircraftName}`}
                    dangerouslySetInnerHTML={{
                        __html: highlightedValue,
                    }}></span>
                <div>
                    <span>{aicraftTypeName}</span>
                    <span>
                        <img src='./images/circle.svg' alt='' />
                    </span>
                    <span>{typeText}</span>
                </div>
            </div>
            <span className={classes.speedSpan}>{speedText} км/ч</span>
            <span className={classes.distanceSpan}>{distanceText} км</span>
            <span className={classes.passengerSpan}>{passengerText}</span>
        </div>
    );
};

export default AircraftInfo;
