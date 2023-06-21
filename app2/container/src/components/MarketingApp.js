import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "marketing/MarketingApp";

const MarketingApp = () => {
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
        });

        history.listen(function (location, action) {
            mountReturn.onParentNavigate(location, action);
        });
    }, []);

    return <div ref={ref} />;
};

export default MarketingApp;
