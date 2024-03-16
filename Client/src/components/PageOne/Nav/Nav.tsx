import Logo from "../../Common/Logo/Logo";
import ThemeSwitcher from "../../Common/ThemeSwitcher/ThemeSwitcher";
import "./Nav.scss";

const Nav = () => {
    return (
        <nav className='nav'>
            <Logo />
            <ThemeSwitcher />
        </nav>
    );
};

export default Nav;
