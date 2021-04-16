import { statusApiLink, jobApiLink, statusImageLink } from "./Permalink";
import { JobBuilder, JobOptions } from "../types/Jobs";
import { StatusBuilder, StatusOptions } from "../types/Status";
import { State } from "../types/State";
import { CustomAction } from "../types/CustomAction";
import { InitialMapOptionsState, Location } from "../types/MapOptions";
import { geoLocation } from "./GeoLocation";

export const getJobs = () => async (
    dispatch: (action: CustomAction) => unknown,
    _: State
) => {
    let jobs: JobOptions[] = [];
    const jobsResult = await fetch(jobApiLink, { method: "GET" });

    if (jobsResult.status === 200) {
        const data = await jobsResult.json();
        // jobs = data.map((job: any) => JobBuilder(job));
        for (const job of data) {
            const location = await getLatLong(job);
            jobs.push(JobBuilder(Object.assign(job, { location })));
        }
    }

    dispatch({ type: "REPLACE_JOBS", payload: jobs });
};

export const getStatuses = () => async (
    dispatch: (action: CustomAction) => unknown,
    _: State
) => {
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

export const getLocation = () => async (
    dispatch: (action: CustomAction) => unknown,
    _: State
) => {
    const location = await new Promise<Location>((resolve, reject) => {
        geoLocation()
            .then((newLocation) => resolve(newLocation))
            .catch((e) => reject(e));
    });

    dispatch({ type: "SET_LOCATION", payload: location });
};

export const getLatLong = async (job: JobOptions): Promise<Location> => {
    // const address = encodeURIComponent(`${job.address} ${job.city} ${job.province} ${job.country}`);

    // const apiLink = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
    const apiLink = encodeURI(
        `http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=${job.country}&adminDistrict=${job.province}&locality=${job.city}&addressLine=${job.address}&key=${InitialMapOptionsState.credentials}`
    );

    const result = await fetch(apiLink);

    if (result.status === 200) {
        const data = await result.json();
        const location: Location = {
            latitude: data.resourceSets[0].resources[0].point.coordinates[0],
            longitude: data.resourceSets[0].resources[0].point.coordinates[1],
        };
        return location;
    }

    return { latitude: -1, longitude: -1 };
};
