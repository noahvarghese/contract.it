import React from "react";
import { connect } from "react-redux";
import StatusListItem from "./ListItem";
import "./List.css";
import { StatusOptions } from "../../../types/Status";
import { CustomAction } from "../../../types/CustomAction";
import { State } from "../../../types/State";

interface StatusListProps {
    statusList: StatusOptions[];
    showDefault: () => CustomAction;
    showCreateStatus: () => CustomAction;
}

const StatusList: React.FC<StatusListProps> = ({
    statusList,
    showDefault,
    showCreateStatus,
}) => {
    return (
        <div id="Statuses" className="card modal">
            <div className="headerContainer">
                <h1>Statuses</h1>
            </div>
            <div className="statuses">
                {statusList.map((filter) => (
                    <StatusListItem status={filter} key={filter.id} />
                ))}
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={showDefault}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn"
                    onClick={showCreateStatus}
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ statusList, modals }: State) => ({
        statusList,
        modals,
    }),
    (dispatch) => ({
        showDefault: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
        showCreateStatus: () =>
            dispatch({ type: "SHOW_STATUS_FORM", payload: undefined }),
    })
)(StatusList);
