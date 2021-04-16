import React, { MouseEvent, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { MapOptions } from "../../types/MapOptions";
import "./Map.css";
import { EmptyJob, JobOptions } from "../../types/Jobs";
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
    setJob: (job: JobOptions) => CustomAction;
    showDeleteJob: () => CustomAction;
    showEditJob: () => CustomAction;
    setMicrosoft: (microsoft: any) => CustomAction;
}

const Map: React.FC<MapProps> = ({
    jobs,
    map,
    mapOptions,
    modals,
    setJob,
    showDeleteJob,
    showEditJob,
    setMicrosoft,
}) => {
    const [classes, setClasses] = React.useState<string[]>([]);
    // Use to load the map into the correct div
    const [mapRef, setMapRef] = React.useState<HTMLDivElement | null>(null);
    // Holds the map object that is rendered in the div
    const [microsoftMap, setMap] = React.useState<any>(undefined);

    useEffect(() => {
        const newClasses = [];

        if (modals !== "DEFAULT") {
            newClasses.push("blur");
        }

        setClasses(newClasses);
    }, [modals]);

    // Responsible for loading the map into the div
    // And passing the map object to use

    /*
     * We do not use Redux to store the map object
     * as Redux stores the data serialized (as a string)
     * the map object is too large and causes redux to crash
     */
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
        // Do not add any other dependencies otherwise it does not render
    }, [mapRef]);

    useEffect(() => {
        Logs.addLog(microsoftMap, LogLevels.DEBUG);
        Logs.addLog(map.Microsoft, LogLevels.DEBUG);
        if (map.Microsoft && microsoftMap) {
            (async () => {
                // Only use one infobox and replace data each time
                const infobox = new map.Microsoft.Maps.Infobox(
                    microsoftMap.getCenter(),
                    {
                        visible: false,
                    }
                );

                infobox.setMap(microsoftMap);

                // hide any infoboxes when the map is clicked
                map.Microsoft.Maps.Events.addHandler(
                    microsoftMap,
                    "click",

                    (_: MouseEvent<any>) =>
                        infobox.setOptions({
                            ...infobox.getOptions(),
                            visible: false,
                        })
                );

                // handle infobox events
                // can only set event on infobox object

                map.Microsoft.Maps.Events.addHandler(
                    infobox,
                    "click",
                    (e: MouseEvent<any>) => {
                        const { className } = (e as any).originalEvent.target;
                        Logs.addLog(className, LogLevels.DEBUG);
                        switch (className) {
                            // Handle showing images
                            case "imageBtn":
                                infobox.setOptions({
                                    ...infobox.getOptions(),
                                    visible: false,
                                });
                                break;
                            // Handle delete modal
                            case "deleteBtn":
                                infobox.setOptions({
                                    ...infobox.getOptions(),
                                    visible: false,
                                });
                                showDeleteJob();
                                break;
                            // Handle edit modal
                            case "editBtn":
                                infobox.setOptions({
                                    ...infobox.getOptions(),
                                    visible: false,
                                });
                                showEditJob();
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

                // Load pins

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
                            setJob(jobs.find((job) => job.id === metadata.id)!);
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
        // Don't add any more dependencies as this casuses errors to log to the console
        // I think this is due to rerenders as the erros show after a refresh
    }, [map, map.Microsoft, microsoftMap, jobs]);

    return (
        <div className="MapContainer">
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
        setJob: (job: JobOptions) =>
            dispatch({ type: "SET_CURRENT_JOB", payload: job }),
        showDeleteJob: () =>
            dispatch({ type: "SHOW_DELETE_JOB", payload: undefined }),
        showEditJob: () =>
            dispatch({ type: "SHOW_JOB_FORM", payload: undefined }),
        setMicrosoft: (microsoft: any) =>
            dispatch({ type: "SET_MICROSOFT", payload: microsoft }),
    })
)(Map);
