import React from "react";
import Map from "../Overlay/Map";
// import ControlsOverlay from "../Overlay/ControlsOverlay";
import { connect, useDispatch } from "react-redux";
import { State } from "../../types/State";
import ControlsOverlay from "../Overlay/ControlsOverlay";
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
            <ControlsOverlay />
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
