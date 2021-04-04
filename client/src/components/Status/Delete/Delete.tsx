import React from "react";
import { connect } from "react-redux";
import { SetDeleteStatus, SetModals } from "../../../store/actions";
import { CustomAction } from "../../../store/reducers";
import { ModalOptions } from "../../../store/types/modals";
import { State } from "../../../store/types/state";
import { StatusBuilder, StatusOptions } from "../../../store/types/statuses";
import "../../Filter/List/ListItem.css";
import "./Delete.css";

interface DeleteProps {
    status: StatusOptions;
    statuses: StatusOptions[];
    setDeleteStatus: (status: StatusOptions) => CustomAction;
    setModals: (modals: ModalOptions) => CustomAction;
}

const DeleteStatus: React.FC<DeleteProps> = ({
    status,
    statuses,
    setModals,
    setDeleteStatus,
}) => {
    if (status.label === undefined) {
        status = statuses.find((st) => st.id === status.id)!;
    }

    const hideModal = () => {
        setDeleteStatus(StatusBuilder());
        setModals({
            showCreateCustomer: false,
            showCreateStatus: false,
            showDeleteStatus: false,
            showStatuses: false,
            showUpdateStatus: false,
        });
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
                <button type="submit" className="btn">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ current: { status }, statuses }: State) => ({ status, statuses }),
    (dispatch) => ({
        setDeleteStatus: (status: StatusOptions) =>
            dispatch(SetDeleteStatus(status)),
        setModals: (modals: ModalOptions) => dispatch(SetModals(modals)),
    })
)(DeleteStatus);
