import classes from "./AircraftCard.module.scss";

interface Props {
    aircraftModel: string;
    aircraftType: string;
    aircraftSizeCategory: string;
    imgPath: string;
}

const AircraftCard: React.FC<Props> = ({
    aircraftModel,
    aircraftSizeCategory,
    aircraftType,
    imgPath,
}) => {
    const imgPathServer = "http://localhost:3500/" + imgPath;
    return (
        <div className={classes.block}>
            <div className={classes.blockImg}>
                <img src={imgPathServer} alt='' />
            </div>
            <div className={classes.subBlockText}>
                <span className={`${classes.aircraftModel} text`}>
                    {aircraftModel.toLocaleUpperCase()}
                </span>
                <div className={classes.aircraftInfo}>
                    <span>{aircraftType}</span>
                    <img src='./images/circle.svg' alt='' className={classes.imgCircle} />
                    <span>{aircraftSizeCategory}</span>
                </div>
            </div>
        </div>
    );
};

export default AircraftCard;
