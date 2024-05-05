import classes from "./RecommendedCard.module.scss";
interface Props {
    aircraftName: string;
    imgPath: string;
}
const RecommendedCard: React.FC<Props> = ({aircraftName, imgPath}) => {
    const imgPathServer = `url("http://localhost:3500/${imgPath}")`;
    return (
        <div className={classes.block} style={{backgroundImage: imgPathServer}}>
            <span>{aircraftName}</span>
        </div>
    );
};

export default RecommendedCard;
