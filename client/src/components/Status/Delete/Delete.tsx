import React from "react";
import { connect } from "react-redux";
import { CustomAction } from "../../../types/CustomAction";
import { State } from "../../../types/State";
import { StatusOptions } from "../../../types/Status";
import "../../Filter/List/ListItem.css";
import "./Delete.css";

interface DeleteProps {
    status: StatusOptions;
    statusList: StatusOptions[];
    setDeleteStatus: (status: StatusOptions) => CustomAction;
    setModals: () => CustomAction;
}

const DeleteStatus: React.FC<DeleteProps> = ({
    status,
    statusList,
    setModals,
    setDeleteStatus,
}) => {
    if (status.label === undefined) {
        status = statusList.find((st) => st.id === status.id)!;
    }

    const hideModal = () => {
        setModals();
    };

    const deleteStatus = () => {
        // fetch request to go here
        setDeleteStatus(status);
        setModals();
    };

    return (
        <div className="card modal" id="DeleteStatus">
            <div className="headerContainer">
                <h1>Delete Status</h1>
            </div>
            <div className="disclaimer">Are you sure you want to delete:</div>
            <div className="Filter">
                <div id="filter" className="content">
                    <div className="imgContainer">
                        <img src={status.image} alt={status.label} />
                    </div>
                    <span>{status.label}</span>
                </div>
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={hideModal}>
                    Cancel
                </button>
                <button type="submit" className="btn" onClick={deleteStatus}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ current: { status }, statusList }: State) => ({ status, statusList }),
    (dispatch) => ({
        setDeleteStatus: (status: StatusOptions) =>
            dispatch({ type: "DELETE_STATUS", payload: status }),
        setModals: () => dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(DeleteStatus);
