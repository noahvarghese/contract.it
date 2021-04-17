/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
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
    mobile?: boolean;
}

const StatusList: React.FC<StatusListProps> = ({
    statusList,
    showDefault,
    showCreateStatus,
    mobile,
}) => {
    const classes = "card" + (mobile ? " mobile" : " card");
    return (
        <div id="Statuses" className={classes}>
            {mobile && (
                <button type="reset" className="btn" onClick={showDefault}>
                    Back
                </button>
            )}
            <div className="container">
                <div className="headerContainer">
                    <h1>Statuses</h1>
                </div>
                <div className="statuses">
                    {statusList.map((filter) => (
                        <StatusListItem
                            status={filter}
                            key={filter.id}
                            mobile={mobile}
                        />
                    ))}
                </div>
            </div>
            {mobile ? (
                <button
                    type="submit"
                    className="btn"
                    onClick={showCreateStatus}
                >
                    Create
                </button>
            ) : (
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
            )}
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
