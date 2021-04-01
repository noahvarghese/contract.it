import React from "react";
import { connect } from "react-redux";
import { LoadBingApi, Microsoft } from "../lib/maps";
import { State } from "../store/types/state";
import { InitialMapState, MapOptions } from "../store/types/map";
import { geoLocation } from "../lib/geolocation";
import { SetLocation } from "../store/actions";
import "../assets/css/Map.css";
import { ModalOptions } from "../store/types/modals";

interface MapProps {
    mapOptions: MapOptions;
    modals: ModalOptions;
    setLocation: (location: { latitude: number; longitude: number; }) => any;
}

const Map: React.FC<MapProps> = ({ setLocation, mapOptions, modals }) => {
    const classNames = [];

    for (const key of Object.keys(modals)) {
        if (modals[key as keyof ModalOptions] === true) {
            classNames.push("blur");
            break;
        }
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
                            const location = await new Promise<{ latitude: number; longitude: number; }>((resolve, reject) => {
                                geoLocation().then(newLocation => resolve(newLocation)).catch((e) => reject(e));
                            });
                            setLocation(location)
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

    return <div id="Map" ref={mapRefChange} className={classNames.join(", ")}></div>;
};

export default connect(
    ({ mapOptions, modals }: State) => ({ mapOptions, modals }),
    (dispatch) => ({
        setLocation: (location: { latitude: number; longitude: number; }) => dispatch(SetLocation(location))
    })
)(Map);
