import React from 'react';
import SearchBar from "./SearchBar";
import "../assets/css/Nav.css";

const NavBar = () => {
    return (
        <div id="Nav">
            <SearchBar />
            <button type="button" id="create">
                Create
            </button>
        </div>
    )
}

export default NavBar;