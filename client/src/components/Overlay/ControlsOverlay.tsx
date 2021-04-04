import React from "react";
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { ModalOptions } from "../../store/types/modals";
import NavBar from "../Nav/Nav";
import FilterList from "../Filter/List/List";
import JobForm from "../Job/Form/Form";
import Blocker from "./Blocker";
import StatusList from "../Status/List/List";
import StatusForm from "../Status/Form/Form";
import DeleteStatus from "../Status/Delete/Delete";
import "./ControlsOverlay.css";

interface ControlsProps {
    modals: ModalOptions;
}

const ControlsOverlay: React.FC<ControlsProps> = ({ modals }) => {
    let showMap = true;

    const keys = Object.keys(modals);

    for (const key of keys) {
        if (modals[key as keyof ModalOptions] === true) {
            showMap = false;
            break;
        }
    }

    let elements;

    if (showMap) {
        elements = (
            <>
                <NavBar />
                <FilterList />
            </>
        );
    } else {
        if (modals.showCreateCustomer) {
            elements = (
                <>
                    <Blocker />
                    <JobForm />
                </>
            );
        } else if (modals.showStatuses) {
            elements = (
                <>
                    <Blocker />
                    <StatusList />
                </>
            );
        } else if (modals.showCreateStatus || modals.showUpdateStatus) {
            elements = (
                <>
                    <Blocker />
                    <StatusForm />
                </>
            );
        } else if (modals.showDeleteStatus) {
            elements = (
                <>
                    <Blocker />
                    <DeleteStatus />
                </>
            );
            // } else if (modals.showUpdateStatus) {
            //     elements = (
            //         <>
            //             <Blocker />
            //             <UpdateStatus />
            //         </>
            //     );
        } else {
            elements = <Blocker />;
        }
    }

    return <div id="ControlsOverlay">{elements}</div>;
};

export default connect(
    ({ modals }: State) => ({ modals }),
    (_) => ({})
)(ControlsOverlay);
