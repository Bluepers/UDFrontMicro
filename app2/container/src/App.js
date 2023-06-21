import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const generateClassName = createGenerateClassName({
    productionPrefix: "cn",
});

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
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
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};

export default App;
