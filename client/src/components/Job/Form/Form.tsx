import React, { MouseEvent, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getFormData } from "../../../lib/Functions";
import { getJobs } from "../../../lib/Data";
import permalink from "../../../lib/Permalink";
import { CustomAction } from "../../../types/CustomAction";
import { EmptyJob, JobOptions } from "../../../types/Jobs";
import { State } from "../../../types/State";
import { StatusOptions } from "../../../types/Status";
import Input from "../../Input/Input";
import "./Form.css";

interface JobFormProps {
    job: JobOptions;
    statusList: StatusOptions[];
    hideJobForm: () => CustomAction;
    resetJob: () => CustomAction;
    mobile?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
    job,
    statusList,
    hideJobForm,
    resetJob,
    mobile,
}) => {
    const classes = "card" + (mobile ? " mobile" : " modal");
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

    const cancelEdit = () => {
        hideJobForm();
        resetJob();
    };

    return (
        <div id="Create" className={classes}>
            {mobile && (
                <button type="button" className="btn" onClick={cancelEdit}>
                    Back
                </button>
            )}
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
            </form>
            {mobile ? (
                <button type="submit" className="btn" onClick={submit}>
                    {job.id ? "Update" : "Create"}
                </button>
            ) : (
                <div className="btnContainer">
                    <button type="reset" className="btn" onClick={cancelEdit}>
                        Cancel
                    </button>
                    <button type="submit" className="btn" onClick={submit}>
                        {job.id ? "Update" : "Create"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default connect(
    ({ statusList, current: { job } }: State) => ({ statusList, job }),
    (dispatch) => ({
        resetJob: () =>
            dispatch({ type: "SET_CURRENT_JOB", payload: EmptyJob() }),
        hideJobForm: () =>
            dispatch({ type: "SHOW_DEFAULT", payload: undefined }),
    })
)(JobForm);
