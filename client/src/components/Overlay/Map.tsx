import React, { MouseEvent, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { MapOptions } from "../../types/MapOptions";
import "./Map.css";
import { JobOptions } from "../../types/Jobs";
import Logs, { LogLevels } from "../../lib/Logs";
import { CustomAction } from "../../types/CustomAction";
import { Map as MapObj } from "../../types/Map";
import { getLatLong } from "../../lib/Data";
import { statusImageLink } from "../../lib/Permalink";
import { Infobox } from "./Infobox";

declare let window: any;

interface MapProps {
    jobs: JobOptions[];
    mapOptions: MapOptions;
    map: MapObj;
    modals: string;
    // setMap: (map: any) => CustomAction;
    setMicrosoft: (microsoft: any) => CustomAction;
}

const Map: React.FC<MapProps> = ({
    jobs,
    map,
    mapOptions,
    modals,
    // setMap,
    setMicrosoft,
}) => {
    const [classes, setClasses] = React.useState<string[]>([]);
    const [mapRef, setMapRef] = React.useState<HTMLDivElement | null>(null);
    const [microsoftMap, setMap] = React.useState<any>(undefined);
    // const mapRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const newClasses = [];

        if (modals !== "DEFAULT") {
            newClasses.push("blur");
        }

        setClasses(newClasses);
    }, [modals]);

    useEffect(() => {
        if (mapRef !== null) {
            (async () => {
                const response = await new Promise<{
                    map: AnalyserNode;
                    Microsoft: any;
                }>((resolve, reject) => {
                    window.bingApiReady = async () => {
                        try {
                            const Microsoft = window.Microsoft;
                            const newMap = new Microsoft.Maps.Map(mapRef);

                            newMap.setOptions(mapOptions);

                            resolve({ map: newMap, Microsoft: Microsoft });
                        } catch (e) {
                            console.error(e);
                        }
                    };

                    const script = document.createElement("script");
                    script.type = "text/javascript";
                    script.async = true;
                    script.defer = true;
                    script.id = "bingApiReady";
                    script.src =
                        "https://www.bing.com/api/maps/mapcontrol?callback=bingApiReady&key=Aut56ZrxAg0xWy9Gj_b6W__VMnAUKH80gZWvk8xs51BO07Srr02hgoueliZXjVQk";
                    script.onerror = (e) => {
                        reject(e);
                    };
                    document.body.appendChild(script);
                });

                // Logs.addLog(response, LogLevels.DEBUG);
                setMicrosoft(response.Microsoft);
                setMap(response.map);
            })();
        }
    }, [mapRef]);

    useEffect(() => {
        // Logs.addLog(microsoftMap, LogLevels.DEBUG);
        if (map.Microsoft && microsoftMap) {
            (async () => {
                const infobox = new map.Microsoft.Maps.Infobox(
                    microsoftMap.getCenter(),
                    {
                        visible: false,
                    }
                );

                infobox.setMap(microsoftMap);

                map.Microsoft.Maps.Events.addHandler(
                    microsoftMap,
                    "click",
                    (_: MouseEvent<any>) =>
                        infobox.setOptions({
                            ...infobox.getOptions(),
                            visible: false,
                        })
                );

                map.Microsoft.Maps.Events.addHandler(
                    infobox,
                    "click",
                    (e: MouseEvent<any>) => {
                        const { className } = (e as any).originalEvent.target;
                        Logs.addLog(className, LogLevels.DEBUG);
                        switch (className) {
                            // Handle showing images
                            case "imageBtn":
                                break;
                            // Handle delete modal
                            case "deleteBtn":
                                break;
                            // Handle edit modal
                            case "editBtn":
                                break;
                            // Handle close
                            case "closeBtn":
                                infobox.setOptions({
                                    ...infobox.getOptions(),
                                    visible: false,
                                });
                                break;
                            default:
                                return;
                        }
                    }
                );

                for (const job of jobs) {
                    const location = await getLatLong(job);

                    const pin = new map.Microsoft.Maps.Pushpin(location, {
                        icon: statusImageLink(job.status.image!),
                        point: new map.Microsoft.Maps.Point(12, 39),
                    });

                    pin.metadata = {
                        id: job.id,
                        name: job.name,
                        email: job.email,
                        phone: job.phone,
                        address: `${job.address} ${job.city}, ${job.province} ${job.country}`,
                        status: {
                            ...job.status,
                            image: statusImageLink(job.status.image!),
                        },
                        location: job.location,
                    };

                    map.Microsoft.Maps.Events.addHandler(
                        pin,
                        "click",
                        (e: MouseEvent<any>) => {
                            Logs.addLog(infobox, LogLevels.DEBUG);
                            const { metadata } = e.target as any;
                            Logs.addLog(metadata, LogLevels.DEBUG);

                            infobox.setOptions({
                                visible: true,
                                htmlContent: Infobox(metadata),
                                // location: metadata.location,
                                location: (e.target as any).getLocation(),
                            });
                            Logs.addLog(metadata, LogLevels.DEBUG);
                        }
                    );

                    microsoftMap.entities.push(pin);
                }
            })();
        }
    }, [map, map.Microsoft, microsoftMap, jobs]);

    return (
        <div className="MapContainer">
            {/* <script
                type="text/javascript"
                id="bingApiReady"
                src="https://www.bing.com/api/maps/mapcontrol?callback=bingApiReady&key=Aut56ZrxAg0xWy9Gj_b6W__VMnAUKH80gZWvk8xs51BO07Srr02hgoueliZXjVQk"
                async
                defer
            ></script> */}
            <div id="Map" ref={setMapRef} className={classes.join(", ")}></div>
        </div>
    );
};

export default connect(
    ({ mapOptions, MicrosoftMaps, modals, jobList }: State) => ({
        map: MicrosoftMaps,
        mapOptions,
        modals,
        jobs: jobList,
    }),
    (dispatch) => ({
        // setMap: (map: any) => dispatch({ type: "SET_MAP", payload: map }),
        setMicrosoft: (microsoft: any) =>
            dispatch({ type: "SET_MICROSOFT", payload: microsoft }),
    })
)(Map);
