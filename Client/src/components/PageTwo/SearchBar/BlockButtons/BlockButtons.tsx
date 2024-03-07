import {useEffect, useState} from "react";
import classes from "./BlockButtons.module.scss";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

interface Props {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const BlockButtons: React.FC<Props> = ({inputValue, setInputValue}) => {
    const [isActive, setActive] = useState<boolean>(false);
    const {transcript} = useSpeechRecognition();

    useEffect(() => {
        if (inputValue.length === 0) {
            setActive(false);
        } else {
            setActive(true);
        }
    }, [inputValue]);

    const handleClearInput = () => {
        setInputValue("");
        setActive(false);
    };

    useEffect(() => {
        setInputValue(transcript);
    }, [setInputValue, transcript]);

    const handleListen = () => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.error("Браузер не поддерживает распознавание речи.");
            return;
        }
        SpeechRecognition.startListening({
            language: "en-US",
        });
    };
    return (
        <div className={classes.block_buttons}>
            <button
                onClick={handleListen}
                className={`button_mic_dark ${isActive ? classes.active : ""} ${classes.btn_mic}`}>
                <img src='./images/mic-dark.svg' alt='' />
            </button>
            <button
                onClick={handleListen}
                className={`button_mic_light ${isActive ? classes.active : ""} ${classes.btn_mic}`}>
                <img src='./images/mic-light.svg' alt='' />
            </button>
            <button
                className={`${classes.btn_clear_text} ${isActive ? classes.active : ""}`}
                onClick={handleClearInput}>
                <img src='./images/x.svg' alt='' />
            </button>
        </div>
    );
};

export default BlockButtons;
