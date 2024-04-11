import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../context/hook";
import ThemeSwitcher from "../../Common/ThemeSwitcher/ThemeSwitcher";
import classes from "./Header.module.scss";

const Header = () => {
    const {aircrafts} = useAppSelector((state) => state);
    const {id} = useParams();
    const aircraft = aircrafts.find((aircraft) => aircraft.id === id);
    const imgPathServer = "http://localhost:3500/" + aircraft?.MainImg;
    const navigate = useNavigate();
    return (
        <>
            {aircraft && (
                <div className={classes.block}>
                    <div className={classes.navBlock}>
                        <button className={`${classes.btn} text`} onClick={() => navigate(-1)}>
                            <img src='/images/arrow_left.svg' alt='' className='button_mic_light' />
                            <img
                                src='/images/arrow_left_white.svg'
                                alt=''
                                className='button_mic_dark'
                            />
                            Назад
                        </button>
                        <ThemeSwitcher />
                    </div>
                    <div className={classes.section_1}>
                        <div className={classes.titleBlock}>
                            <h5 className='text'>{aircraft.Aircraft}</h5>
                            <h1 className={`${classes.titleText} text`}>{aircraft.AircraftName}</h1>
                        </div>
                        <div className={classes.mainImgBlock}>
                            <img src={imgPathServer} alt='' />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
