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
