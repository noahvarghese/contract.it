export interface MapWindow extends Window {
    Microsoft: any;
    bingApiReady: () => void;
}

declare let window: MapWindow;
export let Microsoft: any;

export const LoadBingApi = (key?: string): Promise<void> => {
    const callbackName = "bingApiReady";
    let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}`;

    if (key) {
        url += `&key=${key}`;
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = url;
        window.bingApiReady = () => {
            Microsoft = window.Microsoft;
            resolve();
        };
        script.onerror = (e) => {
            reject(e);
        };
        document.body.appendChild(script);
    });
};
