import "./MainSearchPage.scss";
import Nav from "../../components/Nav/Nav";
import SearchResultsSection from "../../components/SearchResultsSection/SearchResultsSection";
const MainSearchPage = () => {
    return (
        <div className="mainBlock">
            <Nav />
            <h1 className="text">
                Энциклопедия <span>самолётов и вертолётов</span>
            </h1>
            <SearchResultsSection />
        </div>
    );
};

export default MainSearchPage;
