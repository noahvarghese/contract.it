import React from 'react';
import { connect } from "react-redux";
import { State } from "../store/types/state";
import { ModalOptions } from "../store/types/modals";
import SearchBar from "./SearchBar";
import "../assets/css/Nav.css";
import { SetModals } from '../store/actions';

interface NavProps {
    modals: ModalOptions;
    setCreateModal: (modals: ModalOptions) => any;
}

const NavBar: React.FC<NavProps> = ({ modals, setCreateModal }) => {

    const showCreateModal = () => {
        setCreateModal({ ...modals, showCreate: true });
    };

    return (
        <div id="Nav">
            <SearchBar />
            <button type="button" id="create" onClick={showCreateModal}>
                Create
            </button>
        </div>
    )
}

export default connect(
    ({ modals }: State) => ({ modals }),
    (dispatch) => ({ setCreateModal: (modals: ModalOptions) => dispatch(SetModals(modals)) })
)(NavBar);