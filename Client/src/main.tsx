import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime";
import App from "./App.tsx";
import store from "./store/store.ts";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./context/ThemeContext";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
);
