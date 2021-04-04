import { CustomAction } from "../../types/CustomAction";
import { SET_LOCATION } from "../constants";

export const SetLocation = (location: {
    latitude: number;
    longitude: number;
}): CustomAction => {
    return {
        type: SET_LOCATION,
        payload: location,
    };
};
