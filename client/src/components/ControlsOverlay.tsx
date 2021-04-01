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


    return (
        <div id="ControlsOverlay">

            { showMap ?
                (
                    <>
                        <NavBar />
                        <FilterDisplay />
                    </>
                )
                :
                (
                    <>
                        <Blocker />
                        {
                            modals.showCreateCustomer ?
                                (
                                    <CreateCustomerModal />
                                ) : (modals.showStatuses ? (<><Statuses /></>) : "")
                        }
                    </>
                )
            }

        </div>
    )
}

export default connect(
    ({ modals }: State) => ({ modals }),
    (_) => ({})
)(ControlsOverlay);
