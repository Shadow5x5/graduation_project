import AppTitle from "../AppTitle/AppTitle";
import MainIcon from "../MainIcon/MainIcon";
import "./Logo.scss";
const Logo = () => {
    return (
        <div className='logoBlock'>
            <MainIcon />
            <AppTitle />
        </div>
    );
};

export default Logo;
