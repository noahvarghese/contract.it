/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React, { MouseEvent } from "react";
import { Infobox } from "../components/Overlay/Infobox";
import { CustomAction } from "../types/CustomAction";
import { JobOptions } from "../types/Jobs";
import { MapOptions } from "../types/MapOptions";
import { StatusOptions } from "../types/Status";
import { getLatLong } from "./Data";
import Logs, { LogLevels } from "./Logs";
import { statusImageLink } from "./Permalink";

declare let window: any;

export const InitMap = (
    mapRef: HTMLDivElement,
    mapOptions: MapOptions,
    setMicrosoft: (Microsoft: any) => CustomAction,
    setMap: React.Dispatch<any>
) => {
    (async () => {
        const response = await new Promise<{
            map: AnalyserNode;
            Microsoft: any;
        }>((resolve, reject) => {
            window.bingApiReady = async () => {
                try {
                    const newMap = new window.Microsoft.Maps.Map(mapRef);

                    newMap.setOptions(mapOptions);

                    resolve({
                        map: newMap,
                        Microsoft: window.Microsoft,
                    });
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

        setMicrosoft(response.Microsoft);
        setMap(response.map);
    })();
};

export const LoadInfobox = (
    Microsoft: any,
    map: any,
    reducers: (() => CustomAction)[]
): any => {
    const [showDeleteJob, showEditJob] = reducers;

    // Only use one infobox and replace data each time
    const infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });

    infobox.setMap(map);

    // hide any infoboxes when the map is clicked
    Microsoft.Maps.Events.addHandler(
        map,
        "click",

        (_: MouseEvent<any>) =>
            infobox.setOptions({
                ...infobox.getOptions(),
                visible: false,
            })
    );

    // handle infobox events
    // can only set event on infobox object

    Microsoft.Maps.Events.addHandler(infobox, "click", (e: MouseEvent<any>) => {
        const { className } = (e as any).originalEvent.target;

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
            case "backBtn":
                infobox.setOptions({
                    ...infobox.getOptions(),
                    visible: false,
                });
                break;
            default:
                return;
        }
    });
    return infobox;
};

export const CreatePushpin = async (
    job: JobOptions,
    Microsoft: any,
    map: any,
    infobox: any,
    setJob: (job: JobOptions) => CustomAction,
    showMobileInfobox: () => CustomAction
) => {
    const location = await getLatLong(job);

    const pin = new Microsoft.Maps.Pushpin(location, {
        icon: statusImageLink(job.status.image!),
        point: new Microsoft.Maps.Point(12, 39),
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

    Microsoft.Maps.Events.addHandler(pin, "click", (e: MouseEvent<any>) => {});

    Microsoft.Maps.Events.addHandler(pin, "click", (e: MouseEvent<any>) => {
        const { metadata } = e.target as any;
        setJob(job);
        Logs.addLog(window.innerWidth, LogLevels.DEBUG);
        if (window.innerWidth > 1243) {
            infobox.setOptions({
                visible: true,
                htmlContent: Infobox(metadata),
                // location: metadata.location,
                location: (e.target as any).getLocation(),
            });
        } else {
            //show mobileInfo
            showMobileInfobox();
        }
    });

    map.entities.push(pin);
};

export const GetPin = (map: any, job: JobOptions): boolean => {
    const pushpins = map.entities;

    for (let i = 0; i < pushpins.getLength(); i++) {
        const pin = pushpins.get(i);
        if (pin.metadata.id === job.id) {
            return pin;
        }
    }

    return false;
};

export const UpdatePin = async (
    pin: any,
    job: JobOptions,
    map: any,
    Microsoft: any
) => {
    // Pull out only the values needed
    const newValues = {
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

    // redraw as the icon needs to be changed
    if (newValues.status.label !== (pin as any).metadata.status.label) {
        map.entities.remove(pin);
        const location = await getLatLong(job);
        pin = new Microsoft.Maps.Pushpin(location, {
            icon: statusImageLink(job.status.image!),
            point: new Microsoft.Maps.Point(12, 39),
        });
        map.entities.push(pin);
    }

    // write only the changed values
    if (newValues !== (pin as any).metadata) {
        (pin as any).metadata = newValues;
    }
};

export const UpdateMap = (
    map: any,
    Microsoft: any,
    infobox: any,
    jobs: JobOptions[],
    statuses: StatusOptions[],
    setJob: (job: JobOptions) => CustomAction,
    showMobileInfobox: () => CustomAction
) => {
    (async () => {
        const entitiesCount = map.entities.getLength();

        let applyFilter = false;

        for (const status of statuses) {
            if (!status.checked) {
                applyFilter = true;
                break;
            }
        }

        // check if pin length is greater than job length
        // then clear all entities
        if (entitiesCount > jobs.length || applyFilter) {
            map.entities.clear();
        }

        // iterate over jobs
        for (const job of jobs) {
            const pin = GetPin(map, job);

            if (pin) {
                // if found update pin metadata
                await UpdatePin(pin, job, map, Microsoft);
            } else {
                // else create new pin
                const status = statuses.find(
                    (status) => status.id === job.status.id
                );
                if (status?.checked) {
                    await CreatePushpin(
                        job,
                        Microsoft,
                        map,
                        infobox,
                        setJob,
                        showMobileInfobox
                    );
                }
            }
        }
    })();
};
