import React from "react";
import Map from "../Overlay/Map";
// import ControlsOverlay from "../Overlay/ControlsOverlay";
import { connect, useDispatch } from "react-redux";
import { State } from "../../types/State";
import { StatusOptions } from "../../types/Status";
import { CustomAction } from "../../types/CustomAction";
import ControlsOverlay from "../Overlay/ControlsOverlay";
import { getStatuses, getJobs } from "../../lib/Data";

interface AppProps {
    // statusList: StatusOptions[];
    // setStatuses: () => CustomAction;
    // setJobs: () => CustomAction
}

const App: React.FC<AppProps> = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getJobs());
        dispatch(getStatuses());
    }, []);

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
    (dispatch) => ({
        // setStatuses: () =>
        //     dispatch({ type: "REPLACE_STATUS_LIST", payload: getStatuses() }),
        // setJobs: () => dispatch({ type: "REPLACE_JOBS", payload: getJobs() })
    })
)(App);
