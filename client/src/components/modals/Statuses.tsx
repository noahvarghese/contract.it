import React from 'react';
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { SetModals } from "../../store/actions"
import { FilterOptions } from "../../store/types/filters";
import { ModalOptions } from '../../store/types/modals';
import { CustomAction } from '../../store/reducers';
import FilterCrud from '../elements/FilterCrud';
import "../../assets/css/Statuses.css";
import "../../assets/css/modal.css";

interface StatusProps {
    filters: FilterOptions[];
    modals: ModalOptions;
    setModals: (modals: ModalOptions) => CustomAction
}

const Statuses: React.FC<StatusProps> = ({ filters, modals, setModals }) => {
    const hideModal = () => {
        setModals({
            ...modals,
            showStatuses: false
        })
    }

    return (
        <div id="Statuses" className="card modal">
            <div className="headerContainer">
                <h1>Statuses</h1>
            </div>
            <div className="statuses">
                {
                    filters.map((filter) => (
                        <FilterCrud filter={filter} key={filter.id} />
                    ))
                }
            </div>
            <div className="btnContainer">
                <button type="reset" className="btn" onClick={hideModal}>
                    Cancel
                    </button>
                <button type="submit" className="btn">
                    Create
                    </button>
            </div>
        </div>
    )
}

export default connect(
    ({ filters, modals }: State) => {
        return {
            filters,
            modals
        }
    },
    (dispatch) => ({
        setModals: (modals: ModalOptions) => dispatch(SetModals(modals))
    })
)(Statuses);
