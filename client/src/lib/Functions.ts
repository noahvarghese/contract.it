import { CustomAction } from "../types/CustomAction";

export const updateObject = (current: any, updated: any) =>
    Object.assign({}, current, updated);

export const updateItemInArray = (
    array: any[],
    id: number,
    callback: (obj: any) => any
) => {
    const updatedItems = array.map((item) => {
        if (item.id !== id) {
            return item;
        }

        const updatedItem = callback(item);
        return updatedItem;
    });

    return updatedItems;
};

export const deleteItemInArray = (array: any[], id: number) => {
    const index = array.findIndex((item) => item.id === id);
    return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const createReducer = (initialState: any, handlers: object) => {
    return (state: any = initialState, action: CustomAction) => {
        if (handlers.hasOwnProperty(action.type)) {
            return (handlers[action.type as keyof object] as any)(
                state,
                action
            );
        } else {
            return state;
        }
    };
};

export const getFormData = (form: HTMLFormElement | null) => {
    const body = new FormData();
    if (form) {
        for (const el of Array.from(form.elements)) {
            if (el instanceof HTMLElement) {
                if (el.tagName === "INPUT") {
                    if (el.getAttribute("type") !== "file") {
                        body.append(el.getAttribute("name")!, (el as any).value);
                    } else {
                        body.append(el.getAttribute("name")!, (el as any).files![0]);
                    }
                }
            }
        }
    }
    return body;
}