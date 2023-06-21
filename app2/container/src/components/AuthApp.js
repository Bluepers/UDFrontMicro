import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "auth/AuthApp";

/**@type {function ({onSignIn: function (boolean)})} */
const AuthApp = ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const mountReturn = mount(ref.current, {
            onNavigate: (location, action) => {
                const { pathname: nextPathname, key } = location;
                const { pathname: currentPathname } = history.location;
                if (currentPathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            initialPath: history.location.pathname,
            onAuthChange: (status) => {
                onSignIn(status);
            },
        });

        history.listen(function (location, action) {
            mountReturn.onParentNavigate(location, action);
        });
    }, []);

    return <div ref={ref} />;
};

export default AuthApp;
