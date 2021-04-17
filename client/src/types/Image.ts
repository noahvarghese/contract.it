/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { JobOptions } from "./Jobs";

export interface ImageOptions {
    id: number | undefined;
    file: number | undefined;
    text: string | undefined;
}

export const EmptyImage = (): ImageOptions => ({
    id: undefined,
    file: undefined,
    text: undefined,
});

export const ImageBuilder = (options?: any): JobOptions =>
    Object.assign(EmptyImage(), options);
