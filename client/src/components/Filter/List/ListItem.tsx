import React from "react";
import { FilterOptions } from "../../../store/types/filters";
import "./ListItem.css";

interface FilterListItemProps {
    filter: FilterOptions;
}

const FilterListItem: React.FC<FilterListItemProps> = ({ filter }) => {
    return (
        <div className="Filter">
            <div className="content">
                <div className="imgContainer">
                    <img src={filter.image} alt={filter.label} />
                </div>
                <span>{filter.label}</span>
            </div>
            <input
                type="checkbox"
                className="filterCheckbox"
                defaultChecked={filter.checked}
            />
        </div>
    );
};

export default FilterListItem;
