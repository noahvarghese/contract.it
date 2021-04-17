/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { statusImageLink } from "../lib/Permalink";

export interface StatusOptions {
    checked: boolean;
    createdOn: Date | undefined;
    deletedOn: Date | undefined | null;
    id: number | undefined;
    image: string | undefined;
    label: string | undefined;
    updatedOn: Date | undefined;
}

export const EmptyStatus = (): StatusOptions => ({
    id: undefined,
    label: undefined,
    image: undefined,
    createdOn: undefined,
    updatedOn: undefined,
    deletedOn: undefined,
    checked: true,
});

export const StatusBuilder = (options?: any): StatusOptions => {
    if (options !== undefined) {
        if (
            options.image !== undefined &&
            options.image.split("/").length === 0
        ) {
            options.image = statusImageLink(options.image);
        }
    }
    return Object.assign(EmptyStatus(), options);
};
