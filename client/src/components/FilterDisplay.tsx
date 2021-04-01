import React, { MouseEvent } from "react";
import Filter from "./Filter";
import { connect } from "react-redux";
import { State } from "../store/types/state";
import { FilterOptions } from "../store/types/filters";
import ArrowIcon from "../assets/img/arrow.png";
import "../assets/css/FilterDisplay.css";

interface FilterDisplayProps {
    filters: FilterOptions[];
}

const FilterDisplay: React.FC<FilterDisplayProps> = ({ filters }) => {
    const showFilters = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        document.getElementById("filterToggle")!.classList.toggle("show");
        document.getElementById("filters")!.classList.toggle("show");
    };
    return (
        <div id="FilterDisplay">
            <h3 onClick={showFilters}>
                <span>Filters / Statuses</span>
                <span>
                    <button id="filterToggle">
                        <img src={ArrowIcon} alt="arrow" />
                    </button>
                </span>
            </h3>
            <div id="filters">
                <button id="crudFilterBtn">Add / Edit</button>
                <div id="filterContainer">
                    {filters.map((filter, index) => (
                        <Filter filter={filter} key={index + 1} data-id={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default connect(
    ({ filters }: State) => ({
        filters: filters,
    }),
    (_) => ({})
)(FilterDisplay);
