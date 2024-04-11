import classes from "./AircraftCard.module.scss";

interface Props {
    aircraftModel: string;
    aircraftType: string;
    aircraftSizeCategory: string;
    imgPath: string;
    width: number;
    height: number;
}

const AircraftCard: React.FC<Props> = ({
    aircraftModel,
    aircraftSizeCategory,
    aircraftType,
    imgPath,
    width,
    height,
}) => {
    const imgPathServer = "http://localhost:3500/" + imgPath;
    return (
        <div className={classes.block} style={{width: `${width}px`}}>
            <div className={classes.blockImg} style={{height: `${height}px`}}>
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
