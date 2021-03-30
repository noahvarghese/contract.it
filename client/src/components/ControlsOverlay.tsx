import React from 'react'
import NavBar from "./NavBar";
import FilterDisplay from "./FilterDisplay";
import "../assets/css/ControlsOverlay.css";

const ControlsOverlay = () => {
    return (
        <div id="ControlsOverlay">
            <NavBar />
            <FilterDisplay />
            
        </div>
    )
}

export default ControlsOverlay
