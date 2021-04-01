import React from 'react';
import { connect } from "react-redux";
import { State } from "../../store/types/state";
import { FilterOptions } from "../../store/types/filters";
import Input from "../elements/Input";
import "../../assets/css/Create.css";
import { ModalOptions } from '../../store/types/modals';
import { SetModals } from '../../store/actions';
import "../../assets/css/modal.css";

interface CreateProps {
    filters: FilterOptions[];
    modals: ModalOptions;
    setCreateModal: (modals: ModalOptions) => any;
}

const CreateModal: React.FC<CreateProps> = ({ filters, modals, setCreateModal }) => {
    const hideCreate = () => {
        setCreateModal({
            ...modals,
            showCreateCustomer: false
        })
    };

    return (
        <div id="Create" className="card modal">
            <div className="headerContainer">
                <h1>Create</h1>
            </div>
            <form>
                <Input id="CustomerName" name="Customer Name" type="string" currentValue={undefined} />
                <Input id="email" name="Email" type="email" currentValue={undefined} />
                <Input id="address" name="Address" type="address" currentValue={undefined} />
                <Input id="city" name="City" type="string" currentValue={undefined} />
                <Input id="phone" name="Phone" type="tel" currentValue={undefined} />
                <Input id="status" name="Status" type="tel" list="filters" currentValue={undefined} />
                <datalist id="filters">
                    {
                        filters.map((filter) => (
                            <option value={filter.label} key={filter.id} />
                        ))
                    }
                </datalist>
                <div className="btnContainer">
                    <button type="reset" className="btn" onClick={hideCreate}>
                        Cancel
                    </button>
                    <button type="submit" className="btn">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default connect(
    ({ filters, modals }: State) => ({ filters, modals }),
    (dispatch) => ({
        setCreateModal: (modals: ModalOptions) => dispatch(SetModals(modals))
    })
)(CreateModal)
