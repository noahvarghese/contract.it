import permalink from "./Permalink";
import { JobBuilder, JobOptions } from "../types/Jobs";

export const getJobs = async (): Promise<JobOptions[]> => {
    let jobs: JobOptions[] = []
    const jobsResult = await fetch(`${permalink}/api.jobs`, { method: "GET" });

    if (jobsResult.status === 200) {
        jobs = await jobsResult.json().then((data) => data.map((j: any) => JobBuilder(j)));
    }
    return jobs;
}