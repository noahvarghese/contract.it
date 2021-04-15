import { resolve } from "node:path";
import { MouseEvent } from "react";
import { JobOptions } from "../types/Jobs";
import { MapOptions } from "../types/Map";
import { getLatLong } from "./Data";
import Logs, { LogLevels } from "./Logs";
import { statusImageLink } from "./Permalink";

export interface MapWindow extends Window {
    Microsoft: any;
    bingApiReady: () => void;
    deleteJob: (e: MouseEvent<any>) => void;
}

declare let window: MapWindow;
export let Microsoft: any;

const InfoboxTemplate =
    "<div class='infobox'>" +
    "<div class='header'><h1>Customer</h1></div>" +
    "<div class='contents'>" +
    "<span>{name}</span>" +
    "<span><a href='mailto:{email}'>{email}</a></span>" +
    "<span><a href='tel:{phone}'>{phone}</a></span>" +
    "<span>{address}</span>" +
    "<span class='status'><img src='{statusImage}' alt='{statusLabel}' />{statusLabel}</span>" +
    "</div>" +
    "<div class='btnContainer'>" +
    "<button type='button' class='imageBtn' id='imageJobBtn'>Image</button>" +
    "<button type='button' class='deleteBtn' id='deleteJobBtn'>Delete</button>" +
    "<button type='button' class='editBtn' id='editJobBtn'>Edit</button>" +
    "</div>" +
    "</div>'";

const deleteJob = (e: MouseEvent<any>) => {
    Logs.addLog(e, LogLevels.DEBUG);
};

export const LoadPushpins = async (
    map: any,
    infobox: any,
    jobs: JobOptions[]
) => {
    for (const job of jobs) {
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

        Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked(infobox));

        map.entities.push(pin);
    }
};

export const InitInfobox = (map: any): any => {
    const infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });

    infobox.setMap(map);

    // window.deleteJob = (e: MouseEvent) => Logs.addLog(e, LogLevels.DEBUG);

    Microsoft.Maps.Events.addHandler(map, "click", (_: MouseEvent<any>) =>
        infobox.setOptions({ ...infobox.getOptions(), visible: false })
    );

    Microsoft.Maps.Events.addHandler(infobox, "click", (e: MouseEvent<any>) => {
        Logs.addLog((e as any).originalEvent.target.className, LogLevels.DEBUG);
    });
    return infobox;
};

const pushpinClicked = (infobox: any) => (e: MouseEvent<any>) => {
    Logs.addLog(infobox, LogLevels.DEBUG);
    const { metadata } = e.target as any;

    const htmlContent = InfoboxTemplate.replace("{name}", metadata.name)
        .replaceAll("{email}", metadata.email)
        .replaceAll("{phone}", metadata.phone)
        .replace("{address}", metadata.address)
        .replace("{statusImage}", metadata.status.image)
        .replaceAll("{statusLabel}", metadata.status.label);

    infobox.setOptions({
        visible: true,
        htmlContent,
        // location: metadata.location,
        location: (e.target as any).getLocation(),
    });
    Logs.addLog(metadata, LogLevels.DEBUG);
};

export const LoadBingApi = (
    mapOptions: MapOptions,
    node: any
): Promise<void> => {
    const callbackName = "bingApiReady";
    let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}`;

    if (mapOptions.credentials) {
        url += `&key=${mapOptions.credentials}`;
    }

    return new Promise((resolve, reject) => {
        window.bingApiReady = async () => {
            Microsoft = window.Microsoft;
            try {
                const map = new Microsoft.Maps.Map(node);

                console.log(mapOptions.center);
                map.setOptions(mapOptions);
                resolve(map);
            } catch (e) {
                console.error(e);
            }
        };
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.id = "bingApiReady";
        script.src = url;
        script.onerror = (e) => {
            reject(e);
        };
        document.body.appendChild(script);
    });
};
