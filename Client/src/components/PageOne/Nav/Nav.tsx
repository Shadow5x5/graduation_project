import "./Nav.scss";
import Logo from "../Common/Logo/Logo";
import ThemeSwitcher from "../Common/ThemeSwitcher/ThemeSwitcher";

const Nav = () => {
    return (
        <nav className='nav'>
            <Logo />
            <ThemeSwitcher />
        </nav>
    );
};

export default Nav;
