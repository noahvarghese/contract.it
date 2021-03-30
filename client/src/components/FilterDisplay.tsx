import React from 'react';
import ArrowIcon from "../assets/img/arrow.png";
import "../assets/css/FilterDisplay.css";

const FilerDisplay = () => {
    return (
        <div id="FilterDisplay">
            <h3>
                <span>Filters / Statuses</span>
                <span>
                    <button id="filterToggle">
                        <img src={ArrowIcon} alt="arrow" />
                    </button>
                </span>
            </h3>
            <div id="filters"></div>
        </div>
    )
}

export default FilerDisplay
