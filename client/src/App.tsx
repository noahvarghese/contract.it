// import React from "react";
// // import cx from 'classnames';

// function App() {
//     const [toggle, setToggle] = React.useState<boolean>(false);
//     console.log("toggle", toggle);

//     const buttonClasses = toggle
//         ? "bg-red-500 hover:bg-red-500"
//         : "bg-blue-500 hover:bg-blue-500";
//     return (
//         <div className="bg-gray-200 flex items-center justify-center h-screen">
//             <button
//                 className={`p-3 rounded-sm ${buttonClasses}`}
//                 onClick={() => setToggle(!toggle)}
//             >
//                 Toggle
//             </button>
//         </div>
//     );
// }

// export default App;

// import React from 'react';
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { ReactBingmaps } from "react-bingmaps";

// const App = () => {

//     const mapStyle = {
//         width: "100vw",
//         height: "100vh"
//     }

//     return (
//         <div>
//             <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY! as string}>
//                 <GoogleMap
//                     mapContainerStyle={mapStyle}
//                     zoom={12}
//                     center={{ lat: 43.4449, lng: -79.6688 }}
//                 ></GoogleMap>
//             </LoadScript>

//         </div >
//     )
// }

// export default App;

import React from "react";
import { geoLocation } from "./scripts/geolocation";
import Map from "./components/Map";
import ControlsOverlay from "./components/ControlsOverlay";

const App = () => {
    const [state, setState] = React.useState({
        latitude: 43.237972599556436,
        longitude: -79.88584007268457,
        apiKey: "",
    });

    geoLocation().then((location) => {
        setState({
            ...state,
            latitude: location.latitude,
            longitude: location.longitude,
        });
    });

    if (state.apiKey === "") {
        setState({
            ...state,
            apiKey: process.env.REACT_APP_BING_MAPS_API_KEY!,
        });
    }

    return (
        <div>
            <Map
                apiKey={state.apiKey}
                mapOptions={{
                    center: [state.latitude, state.longitude],
                    credentials: state.apiKey,
                    clientWidth: "100%",
                    showDashboard: false,
                    customMapStyle: {
                        elements: {
                            area: { fillColor: "#FAF3E5" },
                            water: { fillColor: "#9CEFF7" },
                            tollRoad: {
                                fillColor: "#ffffff",
                                strokeColor: "#ffffff",
                            },
                            arterialRoad: {
                                fillColor: "#ffffff",
                                strokeColor: "#ffffff",
                            },
                            road: {
                                fillColor: "#ffffff",
                                strokeColor: "#ffffff",
                            },
                            street: {
                                fillColor: "#ffffff",
                                strokeColor: "#ffffff",
                            },
                        },
                    },
                }}
            />
            <ControlsOverlay />
        </div>
    );
};

export default App;
