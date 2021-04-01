import React from "react";
import Map from "./components/Map";
import ControlsOverlay from "./components/ControlsOverlay";
import { connect } from "react-redux";
import { SetFilters } from "./store/actions/index";
import { State } from "./store/types/state";
import { FilterOptions } from "./store/types/filters";
import { statusApiLink, statusImageLink } from "./lib/permalink";

interface AppProps {
    filters: FilterOptions[],
    setFilters: (filters: FilterOptions[]) => any;
}

const App: React.FC<AppProps> = ({ filters, setFilters }) => {
    React.useEffect(() => {
        // console.log(filters)
        if (filters.length === 0) {
            fetch(statusApiLink, { method: "GET" }).then(async (res) => {
                if (res.status === 200) {
                    const data = await res.json();

                    if (Array.isArray(data)) {
                        const newFilters = data.map((filter: FilterOptions) => ({
                            id: filter.id,
                            label: filter.label,
                            image: statusImageLink(filter.image),
                            checked: false
                        }));
                        setFilters(newFilters);
                    }
                }
                else {
                    console.error("NO FETCH");
                }
            })
        }
    });

    return (
        <div id="App">
            <Map />
            <ControlsOverlay />
        </div>
    );
};

export default connect(
    ({ mapOptions, filters }: State) => ({
        location: mapOptions.center,
        filters
    }),
    (dispatch) => ({
        setFilters: (filters: FilterOptions[]) => dispatch(SetFilters(filters))
    })
)(App);
