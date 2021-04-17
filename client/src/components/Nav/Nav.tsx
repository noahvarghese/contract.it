/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React from "react";
import { connect } from "react-redux";
import SearchBar from "./Search/Search";
import "./Nav.css";
import { CustomAction } from "../../types/CustomAction";

interface NavProps {
    showCreateJob: () => CustomAction;
}

const NavBar: React.FC<NavProps> = ({ showCreateJob }) => {
    return (
        <div id="Nav" className="Nav">
            <SearchBar />
            <button type="button" id="create" onClick={showCreateJob}>
                Create
            </button>
        </div>
    );
};

export default connect(
    (_) => ({}),
    (dispatch) => ({
        showCreateJob: () =>
            dispatch({ type: "SHOW_JOB_FORM", payload: undefined }),
    })
)(NavBar);
