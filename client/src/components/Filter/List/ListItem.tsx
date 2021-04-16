import React from "react";
import { connect } from "react-redux";
import { CustomAction } from "../../../types/CustomAction";
import { StatusOptions } from "../../../types/Status";
import "./ListItem.css";

interface FilterListItemProps {
    status: StatusOptions;
    editStatus: (status: StatusOptions) => CustomAction;
}

const FilterListItem: React.FC<FilterListItemProps> = ({
    status,
    editStatus,
}) => {
    const toggleChecked = () => {
        editStatus({
            ...status,
            checked: !status.checked,
        });
    };
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
                onChange={toggleChecked}
            />
        </div>
    );
};

export default connect(
    (_) => ({}),
    (dispatch) => ({
        editStatus: (status: StatusOptions) =>
            dispatch({ type: "EDIT_STATUS", payload: status }),
    })
)(FilterListItem);
