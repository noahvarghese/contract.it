import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { InitialMapState, MapOptions } from "../../types/Map";
import { LoadBingApi, Microsoft } from "../../lib/Maps";
import { geoLocation } from "../../lib/GeoLocation";
import "./Map.css";

interface MapProps {
    modals: string;
    mapOptions: MapOptions;
    setLocation: (location: { latitude: number; longitude: number }) => any;
}

const Map: React.FC<MapProps> = ({ setLocation, mapOptions, modals }) => {
    const classNames: any[] = [];

    if (modals !== "DEFAULT") {
        classNames.push("blur");
    }

    // We only care about the setter
    // As we want to force a page refresh once the ref is valid
    const setMapRef = React.useState(null)[1];

    const mapRefChange = React.useCallback(
        async (node) => {
            setMapRef(node);
            if (node !== null) {
                await LoadBingApi(mapOptions.credentials);

                try {
                    const map = new Microsoft.Maps.Map(node);
                    if (mapOptions.center === InitialMapState.center) {
                        try {
                            const location = await new Promise<{
                                latitude: number;
                                longitude: number;
                            }>((resolve, reject) => {
                                geoLocation()
                                    .then((newLocation) => resolve(newLocation))
                                    .catch((e) => reject(e));
                            });
                            setLocation(location);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    map.setOptions(mapOptions);
                } catch (e) {
                    console.error(e);
                }
            }
        },
        [mapOptions, setMapRef, setLocation]
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
    ({ mapOptions, modals }: State) => ({ mapOptions, modals }),
    (dispatch) => ({
        setLocation: (location: { latitude: number; longitude: number }) =>
            dispatch({ type: "SET_LOCATION", payload: location }),
    })
)(Map);
