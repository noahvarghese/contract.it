/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { ImageOptions } from "./Image";
import { Location } from "./MapOptions";
import { EmptyStatus, StatusOptions } from "./Status";

export interface JobOptions {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    city: string | undefined;
    province: string | undefined;
    country: string | undefined;
    createdOn: Date | undefined;
    updatedOn: Date | undefined;
    deletedOn: Date | undefined;
    status: StatusOptions;
    images: ImageOptions[];
    location: Location;
}

export const EmptyJob = (): JobOptions => ({
    id: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    city: undefined,
    province: undefined,
    country: undefined,
    createdOn: undefined,
    updatedOn: undefined,
    deletedOn: undefined,
    status: EmptyStatus(),
    images: [],
    location: {
        latitude: undefined,
        longitude: undefined,
    },
});

export const JobBuilder = (options?: any): JobOptions => {
    return Object.assign(EmptyJob(), options);
};
