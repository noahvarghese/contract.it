import React from "react";
import { connect } from "react-redux";
import { JobOptions } from "../../types/Jobs";
import { State } from "../../types/State";
import { CustomAction } from "../../types/CustomAction";
import "./MobileInfobox.css";
import { statusImageLink } from "../../lib/Permalink";

interface InfoboxProps {
    job: JobOptions;
    resetModal: () => CustomAction;
    showDelete: () => CustomAction;
    showEdit: () => CustomAction;
}

const Infobox: React.FC<InfoboxProps> = ({
    job,
    resetModal,
    showDelete,
    showEdit,
}) => {
    const phoneLink = `tel:${job.phone}`;
    const emailLink = `mailto${job.email}`;

    return (
        <div className="MobileInfobox card">
            <button type="button" className="btn" onClick={resetModal}>
                Back
            </button>
            <div className="container">
                <div className="header">
                    <h1>Customer</h1>
                </div>
                <div className="contents">
                    <span>{job.name}</span>
                    <span className="links">
                        <a href={emailLink}>{job.email}</a>
                    </span>
                    <span className="links">
                        <a href={phoneLink}>{job.phone}</a>
                    </span>
                    <span>{job.address}</span>
                    <span className="status">
                        <img
                            src={statusImageLink(job.status.image!)}
                            alt={job.status.label}
                        />
                        {job.status.label}
                    </span>
                </div>
            </div>
            <div className="btnContainer">
                <button type="button" className="cameraBtn btn" id="cameraBtn">
                    Camera
                </button>
                <button type="button" className="imageBtn btn" id="imageBtn">
                    Images
                </button>
                <button
                    type="button"
                    className="deleteBtn btn"
                    id="deleteBtn"
                    onClick={showDelete}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="editBtn btn"
                    id="editBtn"
                    onClick={showEdit}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ current: { job } }: State) => ({ job }),
    (dispatch) => ({
        showEdit: () => dispatch({ type: "SHOW_JOB_FORM", payload: undefined }),
        showDelete: () =>
            dispatch({ type: "SHOW_DELETE_JOB", payload: undefined }),
        resetModal: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(Infobox);
