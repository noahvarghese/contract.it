import { statusImageLink } from "../../lib/permalink";

export interface StatusOptions {
    id: number | undefined;
    label: string | undefined;
    image: string | undefined;
    createdOn: Date | undefined;
    updatedOn: Date | undefined;
    deletedOn: Date | undefined;
    checked: boolean | undefined;
}

export const EmptyStatus = (): StatusOptions => ({
    id: undefined,
    label: undefined,
    image: undefined,
    createdOn: undefined,
    updatedOn: undefined,
    deletedOn: undefined,
    checked: undefined,
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
