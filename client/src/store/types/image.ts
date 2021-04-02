import { JobOptions } from "./jobs";

export interface ImageOptions {
    id: number | undefined;
    file: number | undefined;
    text: string | undefined;
}

export const EmptyImage = (): ImageOptions => ({
    id: undefined,
    file: undefined,
    text: undefined
});

export const ImageBuilder = (options?: any): JobOptions =>
    Object.assign(EmptyImage(), options);