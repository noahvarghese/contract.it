import { statusApiLink, jobApiLink, statusImageLink } from "./Permalink";
import { JobBuilder, JobOptions } from "../types/Jobs";
import { StatusBuilder, StatusOptions } from "../types/Status";
import { State } from "../types/State";
import { CustomAction } from "../types/CustomAction";

export const getJobs = () => async (dispatch: (action: CustomAction) => unknown, _: State) => {
    let jobs: JobOptions[] = []
    const jobsResult = await fetch(jobApiLink, { method: "GET" });

    if (jobsResult.status === 200) {
        const data = await jobsResult.json();
        jobs = data.map((job: any) => JobBuilder(job));
    }

    dispatch({ type: "REPLACE_JOBS", payload: jobs });
};

export const getStatuses = () => async (dispatch: (action: CustomAction) => unknown, _: State) => {
    let statuses: StatusOptions[] = [];

    const statusResult = await fetch(statusApiLink, { method: "GET" });

    if (statusResult.status === 200) {
        const data = await statusResult.json();

        statuses = data.map((status: StatusOptions) => {
            status.image = statusImageLink(status.image!);
            return StatusBuilder(status);
        });
    }

    dispatch({ type: "REPLACE_STATUS_LIST", payload: statuses });
};