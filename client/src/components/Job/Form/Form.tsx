import React from "react";
import { connect } from "react-redux";
import { State } from "../../../types/State";
import { StatusOptions } from "../../../types/Status";
import Input from "../../elements/Input";

interface JobFormProps {
    statusList: StatusOptions[];
    hideCreateModal: () => any;
}

const JobForm: React.FC<JobFormProps> = ({ statusList, hideCreateModal }) => {
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
                    {statusList.map((filter) => (
                        <option value={filter.label} key={filter.id} />
                    ))}
                </datalist>
                <div className="btnContainer">
                    <button
                        type="reset"
                        className="btn"
                        onClick={hideCreateModal}
                    >
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
    ({ statusList }: State) => ({ statusList }),
    (dispatch) => ({
        hideCreateModal: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(JobForm);
