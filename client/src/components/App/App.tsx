import React from "react";
import Map from "../Overlay/Map";
// import ControlsOverlay from "../Overlay/ControlsOverlay";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { statusApiLink, statusImageLink } from "../../lib/Permalink";
import { StatusBuilder, StatusOptions } from "../../types/Status";
import { CustomAction } from "../../types/CustomAction";
import ControlsOverlay from "../Overlay/ControlsOverlay";

interface AppProps {
    statusList: StatusOptions[];
    setStatuses: (statuses: StatusOptions[]) => CustomAction;
}

const App: React.FC<AppProps> = ({ statusList, setStatuses }) => {
    React.useEffect(() => {
        if (statusList.length === 0) {
            fetch(statusApiLink, { method: "GET" }).then(async (res) => {
                if (res.status === 200) {
                    const data = await res.json();

                    if (Array.isArray(data)) {
                        const statuses = data.map((status: StatusOptions) => {
                            status.image = statusImageLink(status.image!);
                            return StatusBuilder(status);
                        });
                        setStatuses(statuses);
                    }
                } else {
                    console.error("NO FETCH");
                }
            });
        }
    }, [setStatuses, statusList]);

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
        setStatuses: (statusList: StatusOptions[]) =>
            dispatch({ type: "ADD_STATUS", payload: statusList }),
    })
)(App);
