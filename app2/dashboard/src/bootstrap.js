// import React from "react";
// import ReactDOM from "react-dom";
// import { createMemoryHistory, createBrowserHistory } from "history";

// import App from "./App";

import { createApp } from "vue";
import Dashboard from "../components/Dashboard.vue";

const mount = (el) => {
    const app = createApp(Dashboard);

    app.mount(el);
};

if (process.env.NODE_ENV === "development") {
    const elem = document.querySelector("#dev-dashboard");
    if (elem) {
        // Probable running in development in isolation
        mount(elem);
    }
}

export { mount };
