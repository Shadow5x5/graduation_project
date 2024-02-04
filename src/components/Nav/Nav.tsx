import "./Nav.scss";
import Logo from "./Logo/Logo";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";

const Nav = () => {
    return (
        <nav className="nav">
            <Logo />
            <ThemeSwitcher />
        </nav>
    );
};

export default Nav;
