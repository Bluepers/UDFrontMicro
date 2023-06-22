import React, { lazy, Suspense, useState, useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Router,
    Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import {
    StylesProvider,
    createGenerateClassName,
} from "@material-ui/core/styles";

import Progress from "./components/Progress";

const MarketingLazy = lazy(() => {
    return import("./components/MarketingApp");
});
const AuthLazy = lazy(() => {
    return import("./components/AuthApp");
});
const DashboardLazy = lazy(() => {
    return import("./components/DashboardApp");
});

// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const generateClassName = createGenerateClassName({
    productionPrefix: "cn",
});

const history = createBrowserHistory();

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push("/dashboard");
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header
                        isSignedIn={isSignedIn}
                        onSignOut={() => {
                            setIsSignedIn(false);
                        }}
                    />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy
                                    onSignIn={(status) => {
                                        setIsSignedIn(status);
                                    }}
                                />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};

export default App;
