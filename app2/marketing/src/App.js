import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
    StylesProvider,
    createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "../components/Landing";
import Pricing from "../components/Pricing";

const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
});

/** @type {function ({history: import("history").MemoryHistory<unknown>}): import("react").JSX.Element} */
const App = ({ history }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/pricing" component={Pricing} />
                        <Route exact path="/" component={Landing} />
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    );
};

export default App;
