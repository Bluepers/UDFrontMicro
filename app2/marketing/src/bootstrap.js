import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const mount = (el) => {
    ReactDOM.render(<App />, el);
};

if (process.env.NODE_ENV === "development") {
    const elem = document.querySelector("#dev-marketing");
    if (elem) {
        // Probable running in development in isolation
        mount(elem);
    }
}

export { mount };
