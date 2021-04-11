import { ImageOptions } from "./Image";
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
});

export const JobBuilder = (options?: any): JobOptions =>
    Object.assign(EmptyJob(), options);
