/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React from "react";
import { connect } from "react-redux";
import { JobBuilder, JobOptions } from "../../../types/Jobs";
import { State } from "../../../types/State";
import { CustomAction } from "../../../types/CustomAction";
import "./Delete.css";

interface DeleteProps {
    job: JobOptions;
    resetModals: () => CustomAction;
    setJob: () => CustomAction;
    mobile?: boolean;
}

const Delete: React.FC<DeleteProps> = ({
    job,
    resetModals,
    setJob,
    mobile,
}) => {
    const classes = "DeleteJob card" + (mobile ? " mobile" : " modal");
    const deleteJob = async () => {
        resetModals();
        setJob();
    };
    return (
        <div className={classes}>
            {mobile && (
                <button type="reset" className="btn" onClick={resetModals}>
                    Back
                </button>
            )}
            <div className="container">
                <h1>Delete</h1>
                <p>Are you sure you want to delete customer:</p>
                <p className="job">{job.name}</p>
            </div>
            {mobile ? (
                <button type="submit" className="btn" onClick={deleteJob}>
                    Delete
                </button>
            ) : (
                <div className="btnContainer">
                    <button type="reset" className="btn" onClick={resetModals}>
                        Cancel
                    </button>
                    <button type="submit" className="btn" onClick={deleteJob}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default connect(
    ({ current: { job } }: State) => ({
        job,
    }),
    (dispatch) => ({
        setJob: () =>
            dispatch({ type: "SET_CURRENT_JOB", payload: JobBuilder() }),
        resetModals: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(Delete);
