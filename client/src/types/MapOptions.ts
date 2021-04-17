/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import dotenv from "dotenv";
dotenv.config();

export interface MapColor {
    fillColor: string;
    strokeColor?: string;
}

export interface Location {
    latitude?: number;
    longitude?: number;
}

export interface MapOptions {
    credentials: string;
    center: Location;
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

export const InitialMapOptionsState = {
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
