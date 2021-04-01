import React from 'react';
import { connect } from "react-redux";
import { State } from "../store/types/state"
import NavBar from "./NavBar";
import FilterDisplay from "./FilterDisplay";
import CreateCustomerModal from "./Modals/CreateCustomer";
import Blocker from "./Modals/Blocker";
import "../assets/css/ControlsOverlay.css";
import { ModalOptions } from '../store/types/modals';

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
                                ) : (modals.showStatuses ? (<div>HII</div>) : "")
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
