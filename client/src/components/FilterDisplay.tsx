import React, { MouseEvent } from 'react';
import ArrowIcon from "../assets/img/arrow.png";
import "../assets/css/FilterDisplay.css";

const FilerDisplay = () => {
    const showFilters = (e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.classList.toggle("show");
    }
    return (
        <div id="FilterDisplay">
            <h3>
                <span>Filters / Statuses</span>
                <span>
                    <button id="filterToggle" onClick={showFilters}>
                        <img src={ArrowIcon} alt="arrow" />
                    </button>
                </span>
            </h3>
            <div id="filters">
                <div id="crudFilter">
                    <button id="crudFilterBtn">
                        Add / Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilerDisplay
