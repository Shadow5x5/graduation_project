import classes from "./CardDescription.module.scss";

interface Props {
    designation: string;
    value: string[];
}

const CardDescription: React.FC<Props> = ({designation, value}) => {
    return (
        <>
            {value && (
                <div className={classes.block}>
                    <h2 className="text">{designation}</h2>
                    {value.map((item) => {
                        return <p key={item}>{item}</p>;
                    })}
                </div>
            )}
        </>
    );
};

export default CardDescription;
