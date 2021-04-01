import { CustomAction } from "../reducers";
import { SET_LOCATION } from "../types/actions";

export const SetLocation = (location: { latitude: number; longitude: number;}): CustomAction => ({
    type: SET_LOCATION,
    payload: location
})

