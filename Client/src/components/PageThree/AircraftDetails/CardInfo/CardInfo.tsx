import classes from "./CardInfo.module.scss";
interface Props {
    designation: string;
    value: string;
}

const CardInfo: React.FC<Props> = ({designation, value}) => {
    return (
        <div className={classes.block}>
            <span className={classes.firstSpan}>{designation}</span>
            <span className={classes.secondSpan}>{value}</span>
        </div>
    );
};

export default CardInfo;
