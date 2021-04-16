import React, { MouseEvent, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getFormData } from "../../../lib/Functions";
import { getJobs } from "../../../lib/Data";
import permalink from "../../../lib/Permalink";
import { CustomAction } from "../../../types/CustomAction";
import { JobOptions } from "../../../types/Jobs";
import { State } from "../../../types/State";
import { StatusOptions } from "../../../types/Status";
import Input from "../../Input/Input";

interface JobFormProps {
    job: JobOptions;
    statusList: StatusOptions[];
    hideJobForm: () => CustomAction;
}

const JobForm: React.FC<JobFormProps> = ({ job, statusList, hideJobForm }) => {
    const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
    const dispatch = useDispatch();

    const submit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const url = `${permalink}/api/jobs/${job.id ? job.id : ""}`;
        const method = job.id ? "PUT" : "POST";
        const body = getFormData(formRef);
        const result = await fetch(url, { method, body });
        if (result.status === 200) {
            dispatch(getJobs());
            hideJobForm();
        }
    };
    return (
        <div id="Create" className="card modal">
            <div className="headerContainer">
                <h1>{job.id ? "Update" : "Create"} Customer</h1>
            </div>
            <form ref={setFormRef}>
                <Input
                    id="name"
                    name="Customer Name"
                    type="string"
                    currentValue={job.name}
                />
                <Input
                    id="email"
                    name="Email"
                    type="email"
                    currentValue={job.email}
                />
                <Input
                    id="address"
                    name="Address"
                    type="address"
                    currentValue={job.address}
                />
                <Input
                    id="city"
                    name="City"
                    type="string"
                    currentValue={job.city}
                />
                <Input
                    id="phone"
                    name="Phone"
                    type="tel"
                    currentValue={job.phone}
                />
                <Input
                    id="status"
                    name="Status"
                    type="tel"
                    list="filters"
                    currentValue={job.status.label}
                />
                <datalist id="filters">
                    {statusList.map((filter) => (
                        <option value={filter.label} key={filter.id} />
                    ))}
                </datalist>
                <div className="btnContainer">
                    <button type="reset" className="btn" onClick={hideJobForm}>
                        Cancel
                    </button>
                    <button type="submit" className="btn" onClick={submit}>
                        {job.id ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect(
    ({ statusList, current: { job } }: State) => ({ statusList, job }),
    (dispatch) => ({
        hideJobForm: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(JobForm);
