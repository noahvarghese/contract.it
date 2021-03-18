import React, { ChangeEvent, useState } from 'react'
import permalink from "../lib/permalink";

const SearchBar = () => {
    const [results, setResults] = useState<any[] | null>(null);

    const searchChanged = async (e: ChangeEvent<HTMLInputElement>) => {
        const body = JSON.stringify({ search: e.currentTarget.value });
        const response = await fetch(permalink + "/api/search", { method: "POST", body })
        const json = response.json();

        let newData: any[] = [];
        if (Array.isArray(json)) {
            newData = json.map((item: any, index: number) => (
                <div key={index}>
                    <span className="name">{item.firstName} {item.lastName}</span>
                    <span className="location">{item.address} {item.city}, {item.province} {item.country}</span>
                </div>
            ));
        }
        else {
            console.error("Response not an array.");
        }
        setResults(newData);
    };

    return (
        <div id="Search">
            <div id="SearchBar">
                <input type="text" id="search" name="search" placeholder="Search" onChange={searchChanged} />
                <button id="searchIcon">
                    <img src={permalink + "/static/assets/img/search.png"} alt="Magnifying glass" />
                </button>
            </div>
            <div id="searchResults">{results}</div>
        </div>
    )
}

export default SearchBar;