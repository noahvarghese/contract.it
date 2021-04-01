import React from "react";
import { LoadBingApi, Microsoft } from "../lib/maps";
// import { sleep } from "../lib/sleep";
import "../assets/css/Map.css";

const Map = ({ apiKey, mapOptions }: { apiKey: string; mapOptions?: any }) => {
    const [mapRef, setMapRef] = React.useState(null);
    // const mapRef = React.createRef<HTMLDivElement>();

    const mapRefChange = React.useCallback(
        async (node) => {
            console.log(node);

            setMapRef(node);
            if (node !== null) {
                await LoadBingApi(apiKey);

                try {
                    const map = new Microsoft.Maps.Map(node);
                    if (mapOptions !== {}) {
                        map.setOptions(mapOptions);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },
        []
        // [apiKey, mapOptions, mapRef]
    );

    return <div id="Map" ref={mapRefChange}></div>;
};

export default Map;
