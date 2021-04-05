import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/State";
import Blocker from "./Blocker";
import Nav from "../Nav/Nav";
import JobForm from "../Job/Form/Form";
import FilterList from "../Filter/List/List";
import StatusList from "../Status/List/List";
import StatusForm from "../Status/Form/Form";
import DeleteStatus from "../Status/Delete/Delete";
import "./ControlsOverlay.css";

interface ControlsProps {
    modals: any;
}

const ControlsOverlay: React.FC<ControlsProps> = ({ modals }) => {
    let elements;

    switch (modals) {
        case "DEFAULT":
            elements = (
                <>
                    <Nav />
                    <FilterList />
                </>
            );
            break;
        case "SHOW_JOB_FORM":
            elements = (
                <>
                    <Blocker />
                    <JobForm />
                </>
            );
            break;
        case "SHOW_STATUS_FORM":
            elements = (
                <>
                    <Blocker />
                    <StatusForm />
                </>
            );
            break;
        case "SHOW_DELETE_STATUS":
            elements = (
                <>
                    <Blocker />
                    <DeleteStatus />
                </>
            );
            break;
        case "SHOW_STATUS_LIST":
            elements = (
                <>
                    <Blocker />
                    <StatusList />
                </>
            );
            break;
        default:
            elements = <Blocker />;
    }

    return <div id="ControlsOverlay">{elements}</div>;
};

export default connect(
    ({ modals }: State) => ({ modals }),
    (_) => ({})
)(ControlsOverlay);
