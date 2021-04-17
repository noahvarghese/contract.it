/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React, { useState } from "react";
import SearchBar from "./Search/Search";
import FilterList from "../Filter/List/MobileList";
import Arrow from "../../assets/img/arrow.png";
import "./MobileNav.css";

const MobileNav = () => {
    const [clicked, toggleClicked] = useState(false);
    return (
        <div id="MobileNav" className="Nav">
            <SearchBar mobile={true} />
            <FilterList show={clicked} />
            <button type="button" onClick={() => toggleClicked(!clicked)}>
                <img
                    src={Arrow}
                    alt="Arrow"
                    className={clicked ? "clicked" : ""}
                />
            </button>
        </div>
    );
};

export default MobileNav;
