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
        <div id="Nav">
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
