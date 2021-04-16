import React, { useState } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Map from "../Overlay/Map";
import { connect, useDispatch } from "react-redux";
import { State } from "../../types/State";
import ControlsOverlay from "../Overlay/ControlsOverlay";
import MobileOverlay from "../Overlay/MobileOverlay";
import { getStatuses, getJobs, getLocation } from "../../lib/Data";
import Logs, { LogLevels } from "../../lib/Logs";

const App: React.FC = () => {
    const dispatch = useDispatch();

    // let isSmall = useMediaQuery({ query: "(max-width: 1224px)" });
    // const [element, setElement] = useState(<ControlsOverlay />);

    // React.useEffect(() => {
    //     Logs.addLog(isSmall, LogLevels.DEBUG);
    //     let el = <ControlsOverlay />;
    //     if (isSmall) {
    //         el = <MobileOverlay />;
    //     }
    //     if (el !== element) {
    //         setElement(el);
    //     }
    //     console.log(el);
    // }, [isSmall]);

    React.useEffect(() => {
        dispatch(getLocation());
        dispatch(getJobs());
        dispatch(getStatuses());
    }, [dispatch]);

    return (
        <div id="App">
            <MediaQuery minWidth={1224}>
                <ControlsOverlay />
            </MediaQuery>
            <MediaQuery maxWidth={1223}>
                <MobileOverlay />
            </MediaQuery>
            <Map />
        </div>
    );
};

export default connect(
    ({ mapOptions: { center }, statusList }: State) => ({
        location: center,
        statusList,
    }),
    (_) => ({})
)(App);
