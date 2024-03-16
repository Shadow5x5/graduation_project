import "./styles/global.scss";
import "./App.scss";
import "./styles/theme.scss";
import MainSearchPage from "./pages/MainSearchPage/MainSearchPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import {ThemeContext} from "./context/ThemeContext";
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
function App() {
    const {theme} = useContext(ThemeContext);
    return (
        <div className={theme}>
            <div className='background'>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<MainSearchPage />} />
                        <Route path='/search' element={<SearchResultsPage />} />
                        <Route path='/aircraft/:id' element={<DetailPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
