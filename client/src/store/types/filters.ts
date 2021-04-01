export interface FilterOptions {
    id: number;
    label: string;
    image: string;
    checked: boolean;
}

export const InitialFilters: FilterOptions[] = [];
// export const InitialFilters: FilterOptions[] = [{ id: 0, label: "TEST", image: "TEST", checked: false }];