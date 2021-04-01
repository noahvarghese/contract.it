import React from "react";
import { connect } from "react-redux";
import { LoadBingApi, Microsoft } from "../lib/maps";
import { State } from "../store/types/state";
import { MapOptions } from "../store/types/map";
import "../assets/css/Map.css";

const Map: React.FC<MapOptions> = (mapOptions) => {
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
                    map.setOptions(mapOptions);
                } catch (e) {
                    console.error(e);
                }
            }
        },
        [mapOptions, setMapRef]
    );

    return <div id="Map" ref={mapRefChange}></div>;
};

export default connect(
    ({ mapOptions }: State) => mapOptions,
    (_) => ({})
)(Map);
