import React from 'react';
import { FilterOptions } from '../../store/types/filters';
import Delete from "../../assets/img/delete.png";
import Edit from "../../assets/img/edit.png";
import "../../assets/css/FilterCrud.css";

interface FilterCrudProps {
    filter: FilterOptions;
}

const FilterCrud: React.FC<FilterCrudProps> = ({ filter }) => {
    return (
        <div className="FilterCrud" data-id={filter.id}>
            <div className="content">
                <div className="imgContainer">
                    <img src={filter.image} alt={filter.label} />
                </div>
                <span>{filter.label}</span>
            </div>
            <div className="btnContainer">
                <button type="button">
                    <img src={Edit} alt="edit" />
                </button>
                <button type="button">
                    <img src={Delete} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default FilterCrud
