import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { store } from "./redux/store";

import { initFirebase } from "./services/firebase";
import { log } from "./services/log";

initFirebase().then(() => {
    log("Initialized the database");
});

let root = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
