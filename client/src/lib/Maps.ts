import { JobOptions } from "../types/Jobs";
import { MapOptions } from "../types/Map";
import { getLatLong } from "./Data";
import { statusImageLink } from "./Permalink";

export interface MapWindow extends Window {
    Microsoft: any;
    bingApiReady: () => void;
}

declare let window: MapWindow;
export let Microsoft: any;

export const LoadPushpins = async (map: any, jobs: JobOptions[]) => {

    for (const job of jobs) {
        const location = await getLatLong(job);

        const pin = new Microsoft.Maps.Pushpin(location, {
            icon: statusImageLink(job.status.image!),
            point: new Microsoft.Maps.Point(12, 39)
        });

        map.entities.push(pin);
    }

}

export const LoadBingApi = (mapOptions: MapOptions, node: any): Promise<void> => {
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
