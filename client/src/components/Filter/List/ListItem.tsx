import React from "react";
import { StatusOptions } from "../../../types/Status";
import "./ListItem.css";

interface FilterListItemProps {
    status: StatusOptions;
}

const FilterListItem: React.FC<FilterListItemProps> = ({ status }) => {
    return (
        <div className="Filter">
            <div className="content">
                <div className="imgContainer">
                    <img src={status.image} alt={status.label} />
                </div>
                <span>{status.label}</span>
            </div>
            <input
                type="checkbox"
                className="filterCheckbox"
                defaultChecked={status.checked}
            />
        </div>
    );
};

export default FilterListItem;
