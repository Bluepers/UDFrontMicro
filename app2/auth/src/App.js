import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
    StylesProvider,
    createGenerateClassName,
} from "@material-ui/core/styles";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const generateClassName = createGenerateClassName({
    productionPrefix: "au",
});

/** @type {function ({history: import("history").MemoryHistory<unknown>, onAuthChange: function (any)}): import("react").JSX.Element} */
const App = ({ history, onAuthChange }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route path="/auth/signin">
                            <SignIn
                                onSignIn={() => {
                                    onAuthChange(true);
                                }}
                            />
                        </Route>
                        <Route path="/auth/signup" component={SignUp}>
                            <SignUp
                                onSignIn={() => {
                                    onAuthChange(true);
                                }}
                            />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    );
};

export default App;
