import React from "react";
import { connect } from "react-redux";
import { State } from "../../../store/types/state";
import { FilterOptions } from "../../../store/types/filters";
import { ModalOptions } from "../../../store/types/modals";
import { SetModals } from "../../../store/actions";
import Input from "../../elements/Input";

interface JobFormProps {
    filters: FilterOptions[];
    modals: ModalOptions;
    setCreateModal: (modals: ModalOptions) => any;
}

const JobForm: React.FC<JobFormProps> = ({
    filters,
    modals,
    setCreateModal,
}) => {
    const hideCreate = () => {
        setCreateModal({
            ...modals,
            showCreateCustomer: false,
        });
    };

    return (
        <div id="Create" className="card modal">
            <div className="headerContainer">
                <h1>Create Customer</h1>
            </div>
            <form>
                <Input
                    id="CustomerName"
                    name="Customer Name"
                    type="string"
                    currentValue={undefined}
                />
                <Input
                    id="email"
                    name="Email"
                    type="email"
                    currentValue={undefined}
                />
                <Input
                    id="address"
                    name="Address"
                    type="address"
                    currentValue={undefined}
                />
                <Input
                    id="city"
                    name="City"
                    type="string"
                    currentValue={undefined}
                />
                <Input
                    id="phone"
                    name="Phone"
                    type="tel"
                    currentValue={undefined}
                />
                <Input
                    id="status"
                    name="Status"
                    type="tel"
                    list="filters"
                    currentValue={undefined}
                />
                <datalist id="filters">
                    {filters.map((filter) => (
                        <option value={filter.label} key={filter.id} />
                    ))}
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
    );
};

export default connect(
    ({ filters, modals }: State) => ({ filters, modals }),
    (dispatch) => ({
        setCreateModal: (modals: ModalOptions) => dispatch(SetModals(modals)),
    })
)(JobForm);
