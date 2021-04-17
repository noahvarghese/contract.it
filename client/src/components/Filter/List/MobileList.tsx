/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React from "react";
import { connect } from "react-redux";
import FilterListItem from "./ListItem";
import { StatusOptions } from "../../../types/Status";
import { State } from "../../../types/State";
import "./MobileList.css";

interface FilterListProps {
    show: boolean;
    statusList: StatusOptions[];
    setModals: () => any;
}

const FilterList: React.FC<FilterListProps> = ({
    show,
    statusList,
    setModals,
}) => {
    return (
        <div
            id="MobileFilterDisplay"
            className={"card" + (show ? " show" : "")}
        >
            <h3>
                <span>Filters / Statuses</span>
            </h3>
            <div id="filters">
                <button id="crudFilterBtn" onClick={setModals}>
                    Add / Edit
                </button>
                <div id="filterContainer">
                    {statusList.map((status, index) => (
                        <FilterListItem
                            status={status}
                            key={index + 1}
                            data-id={status.id!}
                        />
                    ))}
                </div>
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
