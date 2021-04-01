import React from 'react';
import { FilterOptions } from "../../store/types/filters";
import "../../assets/css/Filter.css";

interface FilterProps {
    filter: FilterOptions;
}

const FilterToggle: React.FC<FilterProps> = ({ filter }) => {
    return (
        <div className="Filter">
            <div className="content">
                <div className="imgContainer">
                    <img src={filter.image} alt={filter.label} />
                </div>
                <span>{filter.label}</span>
            </div>
            <input type="checkbox" className="filterCheckbox" defaultChecked={filter.checked} />
        </div>
    )
}

export default FilterToggle
