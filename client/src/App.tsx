import React from "react";
import { geoLocation } from "./lib/geolocation";
import Map from "./components/Map";
import ControlsOverlay from "./components/ControlsOverlay";
import { connect } from "react-redux";
import { SetLocation } from "./store/actions/index";
import { InitialState, State } from "./store/types/state";

interface AppProps {
    location: {
        latitude: number;
        longitude: number;
    };
}

const App: React.FC<AppProps> = ({ location }) => {
    React.useEffect(() => {
        if (location === InitialState.mapOptions.center) {
            geoLocation().then((newLocation) => SetLocation(newLocation));
        }
    });

    return (
        <div id="App">
            <Map />
            <ControlsOverlay />
        </div>
    );
};

export default connect(
    ({ mapOptions }: State) => ({
        location: mapOptions.center,
    }),
    (dispatch) => ({
        setLocation: (location: { latitude: number; longitude: number }) =>
            dispatch(SetLocation(location)),
    })
)(App);
