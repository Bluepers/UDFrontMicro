import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

const mount = (
    el,
    { onNavigate, defaultHistory, initialPath, onAuthChange },
) => {
    const history =
        defaultHistory ||
        createMemoryHistory({
            initialEntries: [initialPath],
        });

    if (typeof onNavigate === "function") {
        history.listen(function (location, action) {
            onNavigate(location, action);
        });
    }

    ReactDOM.render(<App history={history} onAuthChange={onAuthChange} />, el);

    const mountReturn = {
        onParentNavigate(location, action) {
            const { pathname: nextPathname, key } = location;
            const { pathname: currentPathname } = history.location;

            if (currentPathname !== nextPathname) {
                history.push(nextPathname);
            }
        },
    };

    return mountReturn;
};

if (process.env.NODE_ENV === "development") {
    const elem = document.querySelector("#dev-auth");
    if (elem) {
        // Probable running in development in isolation
        mount(elem, {
            onNavigate: (location, action) => {
                console.log(location, action);
            },
            defaultHistory: createBrowserHistory(),
            initialPath: "/auth/signin",
        });
    }
}

export { mount };
