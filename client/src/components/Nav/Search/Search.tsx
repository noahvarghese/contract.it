/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import React, { ChangeEvent, useState } from "react";
import permalink from "../../../lib/Permalink";
import SearchIcon from "../../../assets/img/search.png";
import CancelIcon from "../../../assets/img/cancel.png";
import "./Search.css";

interface SearchBarProps {
    mobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ mobile }) => {
    const [results, setResults] = useState<any[] | null>(null);
    const classes = `card ${mobile ? "mobile" : "desktop"}`;

    const searchChanged = async (e: ChangeEvent<HTMLInputElement>) => {
        const body = JSON.stringify({ search: e.currentTarget.value });
        const response = await fetch(permalink + "/api/search", {
            method: "POST",
            body,
        });
        const json = response.json();

        let newData: any[] = [];
        if (Array.isArray(json)) {
            newData = json.map((item: any, index: number) => (
                <div key={index}>
                    <span className="name">
                        {item.firstName} {item.lastName}
                    </span>
                    <span className="location">
                        {item.address} {item.city}, {item.province}{" "}
                        {item.country}
                    </span>
                </div>
            ));
        } else {
            console.error("Response not an array.");
        }
        setResults(newData);
    };

    return (
        <div id="Search" className={classes}>
            <div id="SearchBar">
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search"
                    onChange={searchChanged}
                    aria-labelledby="Search"
                />
                <button className="search" id="cancelIcon">
                    <img src={CancelIcon} alt="Cancel" />
                </button>
                <button className="search" id="searchIcon">
                    <img src={SearchIcon} alt="Magnifying glass" />
                </button>
            </div>
            <div id="searchResults">{results}</div>
        </div>
    );
};

export default SearchBar;
