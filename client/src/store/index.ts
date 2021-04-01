import { createStore } from "redux";
import { reducer, CustomAction } from "./reducers";
import { State } from "./types/state";

export const store = createStore<State, CustomAction, unknown, unknown>(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
