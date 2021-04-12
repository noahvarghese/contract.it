import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { Location, MapOptions } from "../../types/Map";
import { LoadBingApi, LoadPushpins } from "../../lib/Maps";
import "./Map.css";
import { JobOptions } from "../../types/Jobs";

interface MapProps {
    modals: string;
    jobs: JobOptions[];
    mapOptions: MapOptions;
    setLocation: (location: { latitude: number; longitude: number }) => any;
}

const Map: React.FC<MapProps> = ({ setLocation, mapOptions, modals, jobs }) => {
    const classNames: any[] = [];

    if (modals !== "DEFAULT") {
        classNames.push("blur");
    }

    // We only care about the setter
    // As we want to force a page refresh once the ref is valid
    const setMapRef = React.useState(null)[1];

    const mapRefChange = React.useCallback(
        async (node) => {
            if (node !== null) {
                const map = await LoadBingApi(mapOptions, node);
                console.log(map);
                await LoadPushpins(map, jobs);
            }
            setMapRef(node);
        },
        [mapOptions, setMapRef, jobs]
    );

    return (
        <div
            id="Map"
            ref={mapRefChange}
            className={classNames.join(", ")}
        ></div>
    );
};

export default connect(
    ({ mapOptions, modals, jobList }: State) => ({ mapOptions, modals, jobs: jobList }),
    (dispatch) => ({
        setLocation: (location: Location) =>
            dispatch({ type: "SET_LOCATION", payload: location }),
    })
)(Map);
