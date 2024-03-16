import "./MainSearchPage.scss";
import SearchResultsSection from "../../components/PageOne/SearchResultsSection/SearchResultsSection";
import Nav from "../../components/PageOne/Nav/Nav";
import { useEffect } from "react";
const MainSearchPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='mainBlock'>
            <Nav />
            <h1 className='text'>
                Энциклопедия <span>самолётов и вертолётов</span>
            </h1>
            <SearchResultsSection />
        </div>
    );
};

export default MainSearchPage;
