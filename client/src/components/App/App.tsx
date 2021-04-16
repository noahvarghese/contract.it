import React from "react";
import MediaQuery from "react-responsive";
import Map from "../Overlay/Map";
import { connect, useDispatch } from "react-redux";
import { State } from "../../types/State";
import ControlsOverlay from "../Overlay/ControlsOverlay";
import MobileOverlay from "../Overlay/MobileOverlay";
import { getStatuses, getJobs, getLocation } from "../../lib/Data";

const App: React.FC = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getLocation());
        dispatch(getJobs());
        dispatch(getStatuses());
    }, [dispatch]);

    return (
        <div id="App">
            <Map />
            <MediaQuery minWidth={1224}>
                <ControlsOverlay />
            </MediaQuery>
            <MediaQuery maxWidth={1223}>
                <MobileOverlay />
            </MediaQuery>
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
