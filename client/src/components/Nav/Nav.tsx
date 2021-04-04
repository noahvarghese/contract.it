import React from "react";
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { ModalOptions } from "../../store/types/modals";
import { SetModals } from "../../store/actions";
import SearchBar from "./Search/Search";
import "./Nav.css";

interface NavProps {
    modals: ModalOptions;
    setCreateModal: (modals: ModalOptions) => any;
}

const NavBar: React.FC<NavProps> = ({ modals, setCreateModal }) => {
    const showCreateModal = () => {
        setCreateModal({ ...modals, showCreateCustomer: true });
    };

    return (
        <div id="Nav">
            <SearchBar />
            <button type="button" id="create" onClick={showCreateModal}>
                Create
            </button>
        </div>
    );
};

export default connect(
    ({ modals }: State) => ({ modals }),
    (dispatch) => ({
        setCreateModal: (modals: ModalOptions) => dispatch(SetModals(modals)),
    })
)(NavBar);
