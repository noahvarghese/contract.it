import React from "react";
import Map from "./components/Map";
import ControlsOverlay from "./components/ControlsOverlay";
import { connect } from "react-redux";
import { SetFilters } from "./store/actions/index";
import { State } from "./store/types/state";
import { FilterBuilder, FilterOptions } from "./store/types/filters";
import { statusApiLink, statusImageLink } from "./lib/permalink";
import { StatusBuilder, StatusOptions } from "./store/types/statuses";
import { SetStatuses } from "./store/actions";
import { CustomAction } from "./store/reducers";

interface AppProps {
    filters: FilterOptions[],
    setFilters: (filters: FilterOptions[]) => CustomAction;
    setStatuses: (statuses: StatusOptions[]) => CustomAction;
}

const App: React.FC<AppProps> = ({ filters, setFilters, setStatuses }) => {
    React.useEffect(() => {
        // console.log(filters)
        if (filters.length === 0) {
            fetch(statusApiLink, { method: "GET" }).then(async (res) => {
                if (res.status === 200) {
                    const data = await res.json();

                    if (Array.isArray(data)) {
                        const statuses = data.map((status: StatusOptions) => {
                            status.image = statusImageLink(status.image!);
                            return StatusBuilder(status);
                        });
                        setStatuses(statuses);
                        setFilters(
                            statuses.map((status) => FilterBuilder(status))
                        );
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
        setFilters: (filters: FilterOptions[]) => dispatch(SetFilters(filters)),
        setStatuses: (statuses: StatusOptions[]) => dispatch(SetStatuses(statuses))
    })
)(App);
