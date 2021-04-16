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
}

const Delete: React.FC<DeleteProps> = ({ job, resetModals, setJob }) => {
    const deleteJob = async () => {
        resetModals();
        setJob();
    };
    return (
        <div className="DeleteJob card modal">
            <h1>Delete</h1>
            <div className="container">
                <p>Are you sure you want to delete customer:</p>
                <p className="job">{job.name}</p>
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={resetModals}>
                    Cancel
                </button>
                <button type="submit" className="btn" onClick={deleteJob}>
                    Delete
                </button>
            </div>
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
