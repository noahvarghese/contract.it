import React from "react";
import { connect } from "react-redux";
import { CustomAction } from "../../types/CustomAction";
import { State } from "../../types/State";
import "./Error.css";

interface ErrorProps {
    error: string;
    resetModals: () => CustomAction;
    setError: (errorMessage: string) => CustomAction;
}

const Error: React.FC<ErrorProps> = ({ error, resetModals, setError }) => {
    const close = () => {
        resetModals();
        setError("");
    };
    return (
        <div className="card modal">
            <h1>Error</h1>
            <p>{error}</p>
            <div className="btnContainer">
                <button type="button" className="btn" onClick={close}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default connect(
    ({ error }: State) => ({ error }),
    (dispatch) => ({
        resetModals: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
        setError: (errorMessage: string) =>
            dispatch({ type: "SET_ERROR", payload: errorMessage }),
    })
)(Error);
