import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
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
    replaceJobs: (jobs: JobOptions[]) => CustomAction
}

const JobForm: React.FC<JobFormProps> = ({ job, statusList, hideJobForm, replaceJobs }) => {
    const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);

    const submit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const url = `${permalink}/api/jobs/${job.id ? job.id : ""}`;
        const method = job.id ? "PUT" : "POST";
        const body = getFormData(formRef);
        const result = await fetch(url, { method, body });
        if (result.status === 200) {

            replaceJobs(await getJobs());
            hideJobForm();
        }
        console.log(result);
    }
    return (
        <div id="Create" className="card modal">
            <div className="headerContainer">
                <h1>{job.id ? "Update" : "Create"} Customer</h1>
            </div>
            <form ref={setFormRef}>
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
                        onClick={hideJobForm}
                    >
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
        replaceJobs: (jobs: JobOptions[]) => dispatch({ type: "REPLACE_JOBS", payload: jobs })
    })
)(JobForm);
