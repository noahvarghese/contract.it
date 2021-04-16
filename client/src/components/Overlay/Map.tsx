import React, { useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import { MapOptions } from "../../types/MapOptions";
import "./Map.css";
import { JobOptions } from "../../types/Jobs";
import { CustomAction } from "../../types/CustomAction";
import { InitMap, LoadInfobox, UpdateMap } from "../../lib/Map";
import { StatusOptions } from "../../types/Status";

interface MapProps {
    jobs: JobOptions[];
    statuses: StatusOptions[];
    mapOptions: MapOptions;
    Microsoft: any;
    modals: string;
    setJob: (job: JobOptions) => CustomAction;
    showDeleteJob: () => CustomAction;
    showEditJob: () => CustomAction;
    setMicrosoft: (microsoft: any) => CustomAction;
}

const Map: React.FC<MapProps> = ({
    jobs,
    statuses,
    Microsoft,
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
    const [infobox, setInfobox] = React.useState<any>(undefined);
    const [mapLoaded, setMapLoaded] = React.useState(false);

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
            if (!mapLoaded) {
                InitMap(mapRef, mapOptions, setMicrosoft, setMap);
                setMapLoaded(true);
            } else {
                if (!infobox && Microsoft && microsoftMap) {
                    const newInfobox = LoadInfobox(Microsoft, microsoftMap, [
                        showDeleteJob,
                        showEditJob,
                    ]);
                    setInfobox(newInfobox);
                }
            }
        }
        // Do not add any other dependencies otherwise it does not render
    }, [
        mapRef,
        Microsoft,
        microsoftMap,
        mapLoaded,
        showDeleteJob,
        showEditJob,
        setInfobox,
        setMapLoaded,
        mapOptions,
        setMicrosoft,
        infobox,
    ]);

    useEffect(() => {
        if (Microsoft !== null && microsoftMap) {
            if (infobox) {
                UpdateMap(
                    microsoftMap,
                    Microsoft,
                    infobox,
                    jobs,
                    statuses,
                    setJob
                );
            }
        }
        // Don't add any more dependencies as this casuses errors to log to the console
        // I think this is due to rerenders as the erros show after a refresh
    }, [
        Microsoft,
        microsoftMap,
        jobs,
        showDeleteJob,
        showEditJob,
        setJob,
        infobox,
        statuses,
    ]);

    // useEffect(() => {
    //     if (microsoftMap) {
    //         (async () => {
    //             microsoftMap.entities.clear();

    //             for (const job of jobs) {
    //                 const status = statuses.find(
    //                     (status) => status.id === job.status.id
    //                 );

    //                 if (status) {
    //                     if (status.checked) {
    //                         const location = await getLatLong(job);

    //                         const pin = new Microsoft.Maps.Pushpin(location, {
    //                             icon: statusImageLink(job.status.image!),
    //                             point: new Microsoft.Maps.Point(12, 39),
    //                         });

    //                         pin.metadata = {
    //                             id: job.id,
    //                             name: job.name,
    //                             email: job.email,
    //                             phone: job.phone,
    //                             address: `${job.address} ${job.city}, ${job.province} ${job.country}`,
    //                             status: {
    //                                 ...job.status,
    //                                 image: statusImageLink(job.status.image!),
    //                             },
    //                             location: job.location,
    //                         };
    //                         microsoftMap.entities.push(pin);
    //                     }
    //                 }
    //             }
    //         })();
    //     }
    // }, [Microsoft, microsoftMap, statuses]);

    return (
        <div className="MapContainer">
            <div id="Map" ref={setMapRef} className={classes.join(", ")}></div>
        </div>
    );
};

export default connect(
    ({ mapOptions, Microsoft, modals, jobList, statusList }: State) => ({
        Microsoft,
        mapOptions,
        modals,
        jobs: jobList,
        statuses: statusList,
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
