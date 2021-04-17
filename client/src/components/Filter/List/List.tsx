/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React, { MouseEvent } from "react";
import { connect } from "react-redux";
import FilterListItem from "./ListItem";
import ArrowIcon from "../../../assets/img/arrow.png";
import "./List.css";
import { StatusOptions } from "../../../types/Status";
import { State } from "../../../types/State";

interface FilterListProps {
    statusList: StatusOptions[];
    setModals: () => any;
}

const FilterList: React.FC<FilterListProps> = ({ statusList, setModals }) => {
    const showFilters = (_: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        document.getElementById("filterToggle")!.classList.toggle("show");
        document.getElementById("filters")!.classList.toggle("show");
    };

    const items = Array.isArray(statusList)
        ? statusList.map((status, index) => (
              <FilterListItem
                  status={status}
                  key={index + 1}
                  data-id={status.id!}
              />
          ))
        : "";

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
                <button id="crudFilterBtn" onClick={setModals}>
                    Add / Edit
                </button>
                <div id="filterContainer">{items}</div>
            </div>
        </div>
    );
};

export default connect(
    ({ statusList }: State) => ({
        statusList,
    }),
    (dispatch) => ({
        setModals: () =>
            dispatch({ type: "SHOW_STATUS_LIST", payload: undefined }),
    })
)(FilterList);
