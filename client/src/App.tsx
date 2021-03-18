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

import React from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const App = () => {

    const mapStyle = {
        width: "100vw",
        height: "100vh"
    }

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY! as string}>
                <GoogleMap
                    mapContainerStyle={mapStyle}
                    zoom={12}
                    center={{ lat: 43.4449, lng: -79.6688 }}
                ></GoogleMap>
            </LoadScript>

        </div >
    )
}

export default App;
