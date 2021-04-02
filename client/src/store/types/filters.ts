import { statusImageLink } from "../../lib/permalink";

export interface FilterOptions {
    id: number | undefined;
    label: string | undefined;
    image: string | undefined;
    checked: boolean;
}

export const EmptyFilter = (): FilterOptions => ({
    id: undefined,
    label: undefined,
    image: undefined,
    checked: true
});

export const FilterBuilder = (options?: any): FilterOptions => {
    if (options !== undefined) {
        if (options.image !== undefined && options.image.split("/").length === 0) {
            options.image = statusImageLink(options.image);
        }
    }
    return Object.assign(EmptyFilter(), options);
}