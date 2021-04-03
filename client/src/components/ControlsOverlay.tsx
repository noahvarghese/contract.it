import React from 'react';
import { connect } from "react-redux";
import { State } from "../store/types/state"
import NavBar from "./NavBar";
import FilterDisplay from "./cards/FilterDisplay";
import CreateCustomerModal from "./modals/CreateCustomer";
import Blocker from "./modals/Blocker";
import "../assets/css/ControlsOverlay.css";
import { ModalOptions } from '../store/types/modals';
import Statuses from './modals/Statuses';
import CreateStatus from "./modals/CreateStatus";
import DeleteStatus from "./modals/DeleteStatus";
import UpdateStatus from './modals/UpdateStatus';

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
        elements = <><NavBar /><FilterDisplay /></>;
    } else {
        if (modals.showCreateCustomer) {
            elements = <><Blocker /><CreateCustomerModal /></>;
        }
        else if (modals.showStatuses) {
            elements = <><Blocker /><Statuses /></>;
        }
        else if (modals.showCreateStatus) {
            elements = <><Blocker /><CreateStatus /></>;
        }
        else if (modals.showDeleteStatus) {
            elements = <><Blocker /><DeleteStatus /></>;
        }
        else if (modals.showUpdateStatus) {
            elements = <><Blocker /><UpdateStatus /></>;
        }
        else {
            elements = <Blocker />;
        }
    }


    return (
        <div id="ControlsOverlay">
            { elements}
        </div>
    )
}

export default connect(
    ({ modals }: State) => ({ modals }),
    (_) => ({})
)(ControlsOverlay);
