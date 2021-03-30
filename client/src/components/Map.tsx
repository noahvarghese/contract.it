import React from "react";
import { LoadBingApi, Microsoft } from "../scripts/maps";
import "../assets/css/Map.css";

const Map = ({ apiKey, mapOptions }: { apiKey: string; mapOptions?: any }) => {
    const mapRef = React.createRef<HTMLDivElement>();

    const InitMap = () => {
        const map = new Microsoft.Maps.Map(mapRef.current);
        if (mapOptions !== {}) {
            map.setOptions(mapOptions);
        }
    };

    React.useEffect(() => {
        LoadBingApi(apiKey).then(() => InitMap());
    }, [apiKey]);

    return <div id="Map" ref={mapRef}></div>;
};

export default Map;
