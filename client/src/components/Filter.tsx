import React from 'react';
import { FilterOptions } from "../store/types/filters";
import "../assets/css/Filter.css";

interface FilterProps {
    filter: FilterOptions;
}

const Filter: React.FC<FilterProps>= ({filter}) => {
    return (
        <div className="Filter">
            <div className="imageContainer">
                <img src={filter.image} alt={filter.label} />
            </div>
            <h4>{ filter.label }</h4>
            <input type="checkbox" className="filterCheckbox" checked={filter.checked} />        
        </div>
    )
}

export default Filter
