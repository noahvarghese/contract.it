import React from "react";
import SearchBar from "./Search/Search";

const MobileNav = () => {
    return (
        <div id="MobileNav" className="Nav">
            <SearchBar mobile={true} />
        </div>
    );
};

export default MobileNav;
