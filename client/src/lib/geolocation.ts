// Get user geolocation
export const geoLocation = (): Promise<{latitude: number; longitude: number}> => new Promise((res, rej) => {
    const location = { 
        latitude: 43.237972599556436, 
        longitude: -79.88584007268457
    };

    if (!navigator.geolocation) {
        console.error("Failed to get user location");
        rej(location);
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            res(location);
        }, () => {
            console.error("Failed to get user location");
            rej(location);
        });
    }
});