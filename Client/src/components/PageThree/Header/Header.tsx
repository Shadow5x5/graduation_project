import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../context/hook";
import ThemeSwitcher from "../../Common/ThemeSwitcher/ThemeSwitcher";
import classes from "./Header.module.scss";
import {useState, useMemo} from "react";

const Header = () => {
    const selectedAircraft = useAppSelector((state) => state.selectedAircraft);

    const imgPathServer = useMemo(
        () => "http://localhost:3500/" + selectedAircraft?.MainImg,
        [selectedAircraft],
    );
    const navigate = useNavigate();

    const highlightedValue = useMemo(() => {
        if (!selectedAircraft?.AircraftName) return "";
        const regex = /\b\w*\d\w*\b/g;
        return selectedAircraft.AircraftName.replace(
            regex,
            (match) => `<span class="${classes.markupText}">${match}</span>`,
        );
    }, [selectedAircraft]);

    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {selectedAircraft && (
                <div className={classes.block}>
                    <div className={classes.navBlock}>
                        <button
                            className={`${classes.btn} text`}
                            onClick={() => navigate("/search")}>
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
                            <h5 className='text'>{selectedAircraft.Aircraft}</h5>
                            <h1
                                className={`${classes.titleText} text`}
                                dangerouslySetInnerHTML={{__html: highlightedValue}}></h1>
                        </div>
                        <div
                            className={classes.mainImgBlock}
                            onLoad={() => setLoaded(true)}
                            style={{opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease"}}>
                            <img src={imgPathServer} alt='' />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
