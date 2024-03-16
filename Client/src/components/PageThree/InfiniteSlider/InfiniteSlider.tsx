import {useEffect, useRef, useState} from "react";
import classes from "./InfiniteSlider.module.scss";
import {useAppSelector} from "../../../context/hook";
import {useParams} from "react-router-dom";

const TRANSITION_DURATION = 300;
const BUTTON_DISABLE_TIME = 600;
const PAGE_WIDTH = 792;
const COLUMN_GAP = 8;

const InfiniteSlider = () => {
    const {aircrafts} = useAppSelector((state) => state);
    const {id} = useParams();
    const aircraft = aircrafts.find((aircraft) => aircraft.id === id);
    let imgPath:string[] = []
    if(aircraft && aircraft.SliderImages && aircraft.SliderImages.length > 0) {
        imgPath = aircraft.SliderImages.map((item) => "http://localhost:3500/" + item);
    }
    const length = imgPath.length;
    const [startPoint, setStartPoint] = useState(-(PAGE_WIDTH + PAGE_WIDTH / 2 + COLUMN_GAP));
    const [endPoint, setEndPoint] = useState(
        -(PAGE_WIDTH * length + COLUMN_GAP * length + PAGE_WIDTH / 2),
    );
    const [startPointCircle] = useState(0);
    const [endPointCircle, setEndPointCircle] = useState(-((4 + COLUMN_GAP) * (length - 1)));
    const [offSet, setOffSet] = useState(startPoint);
    const [circleOffset, setCirlceOffSet] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexCircle, setCurrentIndexCircle] = useState(0);
    const [transitionDuration, setTransitionDuration] = useState(TRANSITION_DURATION);
    const [buttonsEnabled, setButtonsEnabled] = useState(true);
    const [widthButton, setWidthButton] = useState(PAGE_WIDTH / 2);
    const windowElRef = useRef<HTMLDivElement>(null);

    const slides = [
        imgPath[imgPath.length - 2],
        imgPath[imgPath.length - 1],
        ...imgPath,
        imgPath[0],
        imgPath[1],
    ];

    useEffect(() => {
        const updateSliderSettings = () => {
            const offsetWidth = windowElRef.current?.offsetWidth;
            if (offsetWidth) {
                const adjustedWidth = Math.abs((1600 - offsetWidth) / 2);

                const newOffSet = -(PAGE_WIDTH + PAGE_WIDTH / 2 + COLUMN_GAP + adjustedWidth);
                setOffSet(newOffSet);
                setStartPoint(newOffSet);

                const newEndPoint = -(
                    PAGE_WIDTH * length +
                    COLUMN_GAP * length +
                    PAGE_WIDTH / 2 +
                    adjustedWidth
                );
                setEndPoint(newEndPoint);

                setWidthButton(PAGE_WIDTH / 2 - adjustedWidth);
            }
            setCurrentIndex(0);
            setCurrentIndexCircle(0);
            setCirlceOffSet(0);
        };
        updateSliderSettings();
        const handleResize = () => {
            updateSliderSettings();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [length]);

    useEffect(() => {
        if (transitionDuration === 0) {
            setTimeout(() => {
                setTransitionDuration(TRANSITION_DURATION);
            }, TRANSITION_DURATION);
        }
    }, [transitionDuration]);

    useEffect(() => {
        setEndPointCircle(-((4 + COLUMN_GAP) * (length - 1)));
        if (offSet > startPoint) {
            setTimeout(() => {
                setOffSet(endPoint);
                setCirlceOffSet(endPointCircle);
                setTransitionDuration(0);
                setCurrentIndex(length - 1);
                setCurrentIndexCircle(length - 1);
            }, TRANSITION_DURATION);
        }
        if (offSet < endPoint) {
            setTimeout(() => {
                setOffSet(startPoint);
                setCirlceOffSet(startPointCircle);
                setTransitionDuration(0);
                setCurrentIndex(0);
                setCurrentIndexCircle(0);
            }, TRANSITION_DURATION);
        }
    }, [offSet, length]);

    const handleSlideChange = (direction: string) => {
        if (!buttonsEnabled) return;
        setButtonsEnabled(false);
        setTimeout(() => {
            setButtonsEnabled(true);
        }, BUTTON_DISABLE_TIME);

        const offsetChange =
            direction === "next" ? -(PAGE_WIDTH + COLUMN_GAP) : PAGE_WIDTH + COLUMN_GAP;
        const circleOffsetChange = direction === "next" ? -(4 + COLUMN_GAP) : 4 + COLUMN_GAP;
        setOffSet((currentOffSet) => currentOffSet + offsetChange);
        setCirlceOffSet((currentOffSet) => currentOffSet + circleOffsetChange);
        setCurrentIndex((currentIndex) => currentIndex + (direction === "next" ? 1 : -1));
        setCurrentIndexCircle((currentIndex) => currentIndex + (direction === "next" ? 1 : -1));
    };

    function renderCircles() {
        const circles = [];
        for (let i = 0; i < length + 4; i++) {
            circles.push(
                <span
                    key={i}
                    className={`${
                        currentIndexCircle === i - 2
                            ? classes.activeCircle
                            : currentIndexCircle === i + 1 - 2
                            ? classes.prectiveCircle
                            : currentIndexCircle === i - 1 - 2
                            ? classes.prectiveCircle
                            : ""
                    } ${classes.circle}`}
                    style={{
                        transitionDuration: `${transitionDuration}ms`,
                    }}></span>,
            );
        }

        return circles;
    }
    return (
        <div className={classes.container}>
            <div className={classes.window} ref={windowElRef}>
                <div
                    className={classes.block}
                    style={{
                        transform: `translateX(${offSet}px)`,
                        transitionDuration: `${transitionDuration}ms`,
                    }}>
                    {slides.map((img, index) => (
                        <div
                            className={`${
                                currentIndex === index - 2 ? classes.slideActive : ""
                            } : ""} ${classes.slide}`}
                            key={index}
                            style={{
                                minWidth: `${PAGE_WIDTH}px`,
                                maxWidth: `${PAGE_WIDTH}px`,
                                transitionDuration: `${transitionDuration}ms`,
                            }}>
                            <img src={img} alt='' />
                            <button
                                className={classes.slideButtonPrev}
                                onClick={() => handleSlideChange("prev")}
                                disabled={!buttonsEnabled}></button>
                            <button
                                className={classes.slideButtonNext}
                                onClick={() => handleSlideChange("next")}
                                disabled={!buttonsEnabled}></button>
                        </div>
                    ))}
                </div>
                <button
                    className={classes.sliderButtonLeft}
                    onClick={() => handleSlideChange("prev")}
                    disabled={!buttonsEnabled}
                    style={{width: `${widthButton}px`}}></button>
                <button
                    className={classes.sliderButtonRight}
                    onClick={() => handleSlideChange("next")}
                    disabled={!buttonsEnabled}
                    style={{width: `${widthButton}px`}}></button>
            </div>
            <div className={classes.windowCircles}>
                <div
                    className={classes.blockCircles}
                    style={{
                        transform: `translateX(${circleOffset}px)`,
                        transitionDuration: `${transitionDuration}ms`,
                    }}>
                    {renderCircles()}
                </div>
            </div>
        </div>
    );
};

export default InfiniteSlider;
