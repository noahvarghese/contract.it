import React, { MouseEvent } from "react";
import { connect } from "react-redux";
import permalink from "../../../lib/Permalink";
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
    setError: (errorMessage: string) => CustomAction;
    showError: () => CustomAction;
    mobile?: boolean;
}

const DeleteStatus: React.FC<DeleteProps> = ({
    status,
    statusList,
    setModals,
    setDeleteStatus,
    setError,
    showError,
    mobile,
}) => {
    if (status.label === undefined) {
        status = statusList.find((st) => st.id === status.id)!;
    }

    const hideModal = () => {
        setModals();
    };

    const deleteStatus = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await fetch(`${permalink}/api/statuses/${status.id}`, {
            method: "DELETE",
        });
        if (response.status === 200) {
            // need to check for success
            setModals();
            setDeleteStatus(status);
        } else {
            const errorMessage = (await response.json()).message;
            setError(errorMessage);
            showError();
        }
    };

    const classes = "card" + (mobile ? " mobile" : " modal");

    return (
        <div className={classes} id="DeleteStatus">
            {mobile && (
                <button type="reset" className="btn" onClick={hideModal}>
                    Back
                </button>
            )}
            <form>
                <div className="headerContainer">
                    <h1>Delete Status</h1>
                </div>
                <div className="disclaimer">
                    Are you sure you want to delete:
                </div>
                <div className="Filter">
                    <div id="filter" className="content">
                        <div className="imgContainer">
                            <img src={status.image} alt={status.label} />
                        </div>
                        <span>{status.label}</span>
                    </div>
                </div>
                {!mobile && (
                    <div className="btnContainer">
                        <button
                            type="reset"
                            className="btn"
                            onClick={hideModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            onClick={deleteStatus}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </form>
            {mobile && (
                <button type="submit" className="btn" onClick={deleteStatus}>
                    Delete
                </button>
            )}
        </div>
    );
};

export default connect(
    ({ current: { status }, statusList }: State) => ({ status, statusList }),
    (dispatch) => ({
        setDeleteStatus: (status: StatusOptions) =>
            dispatch({ type: "DELETE_STATUS", payload: status }),
        setModals: () => dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
        showError: () => dispatch({ type: "SHOW_ERROR", payload: undefined }),
        setError: (errorMessage: string) =>
            dispatch({ type: "SET_ERROR", payload: errorMessage }),
    })
)(DeleteStatus);
