import React from 'react';
import { connect } from "react-redux";
import { State } from "../store/types/state"
import NavBar from "./NavBar";
import FilterDisplay from "./FilterDisplay";
import CreateModal from "./Modals/Create";
import Blocker from "./Modals/Blocker";
import "../assets/css/ControlsOverlay.css";
import { ModalOptions } from '../store/types/modals';

interface ControlsProps {
    modals: ModalOptions;
}

const ControlsOverlay: React.FC<ControlsProps> = ({ modals }) => {
    let display;

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

            { showMap ? (
                <>
                    <NavBar />
                    <FilterDisplay />
                </>
            )
                :

                (
                    <>
                        <CreateModal />
                        <Blocker />
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
