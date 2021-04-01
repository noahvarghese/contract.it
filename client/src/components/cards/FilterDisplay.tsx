import React, { MouseEvent } from "react";
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { FilterOptions } from "../../store/types/filters";
import { ModalOptions } from "../../store/types/modals";
import { SetModals } from "../../store/actions";
import FilterToggle from "../elements/FilterToggle";
import ArrowIcon from "../../assets/img/arrow.png";
import "../../assets/css/FilterDisplay.css";

interface FilterDisplayProps {
    filters: FilterOptions[];
    modals: ModalOptions;
    setModals: (modals: ModalOptions) => any;
}

const FilterDisplay: React.FC<FilterDisplayProps> = ({ filters, modals, setModals }) => {
    const showFilters = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        document.getElementById("filterToggle")!.classList.toggle("show");
        document.getElementById("filters")!.classList.toggle("show");
    };

    const showModals = () => {
        setModals({
            ...modals,
            showStatuses: true
        })
    }

    return (
        <div id="FilterDisplay" className="card">
            <h3 onClick={showFilters}>
                <span>Filters / Statuses</span>
                <span>
                    <button id="filterToggle">
                        <img src={ArrowIcon} alt="arrow" />
                    </button>
                </span>
            </h3>
            <div id="filters">
                <button id="crudFilterBtn" onClick={showModals}>Add / Edit</button>
                <div id="filterContainer">
                    {filters.map((filter, index) => (
                        <FilterToggle filter={filter} key={index + 1} data-id={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default connect(
    ({ filters, modals }: State) => ({
        filters: filters,
        modals: modals
    }),
    (dispatch) => ({
        setModals: (modals: ModalOptions) => dispatch(SetModals(modals))
    })
)(FilterDisplay);
