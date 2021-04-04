import dotenv from "dotenv";
dotenv.config();

export interface MapColor {
    fillColor: string;
    strokeColor?: string;
}

export interface MapOptions {
    credentials: string;
    center: {
        latitude: number;
        longitude: number;
    };
    clientWidth: string;
    showDashboard: boolean;
    customMapStyle: {
        elements: {
            area: MapColor;
            water: MapColor;
            tollRoad: MapColor;
            arterialRoad: MapColor;
            road: MapColor;
            street: MapColor;
        };
        settings: {
            landColor: string;
        };
    };
}

export const InitialMapState = {
    credentials: process.env.REACT_APP_BING_MAPS_API_KEY!,
    center: {
        latitude: 43.237972599556436,
        longitude: -79.88584007268457,
    },
    clientWidth: "100%",
    showDashboard: false,
    customMapStyle: {
        elements: {
            area: { fillColor: "#FAF3E5" },
            water: { fillColor: "#9CEFF7" },
            tollRoad: {
                fillColor: "#ffffff",
                strokeColor: "#ffffff",
            },
            arterialRoad: {
                fillColor: "#ffffff",
                strokeColor: "#ffffff",
            },
            road: {
                fillColor: "#ffffff",
                strokeColor: "#ffffff",
            },
            street: {
                fillColor: "#ffffff",
                strokeColor: "#ffffff",
            },
        },
        settings: {
            landColor: "#FAF3E5",
        },
    },
};
