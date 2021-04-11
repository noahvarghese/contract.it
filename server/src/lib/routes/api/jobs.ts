import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import Job from "../../models/Job";
import Status from "../../models/Status";
import Logs, { LogLevels } from "../../util/Logs";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const JobManager = getRepository(Job);
    const StatusManager = getRepository(Status);

    const jobs: Job[] = await JobManager.find();
    console.log(jobs);

    for (let job of jobs) {
        job.status = (await StatusManager.find({ where: { id: job.statusId } }))[0];
    }


    // console.log(returnData)

    res.status(200);
    res.send(jobs);
});

router.get("/:id", async (req: Request, res: Response) => {
    const JobManager = getRepository(Job);
    const job: Job = (
        await JobManager.find({ where: { id: req.params.id }, take: 1 })
    )[0];
    res.status(200);
    res.send(job);
});

router.post("/", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    const JobManager = getRepository(Job);

    if (!req.body.status) {
        res.status(400);
        res.send({ message: "Status is required but missing." });
        return;
    }

    const statusResult = await StatusManager.find({ where: { label: req.body.status } });
    const status = statusResult.length > 0 ? statusResult[0] : null;

    if (status !== null) {
        const province = "ON";
        const country = "Canada";

        const job: Job[] = JobManager.create({ ...req.body, status: status.id, province, country });

        if (job) {
            try {
                await JobManager.save(job);
                res.sendStatus(200);
                return;
            } catch (e) {
                Logs.addLog(e.message, LogLevels.ERROR);
                // Logs.addLog("Error creating job.", LogLevels.ERROR);
                res.sendStatus(400);
                return;
            }
        }
        res.sendStatus(500);
    }
    else {
        res.sendStatus(400);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const JobManager = getRepository(Job);
    if (!req.body.status_id) {
        res.status(400);
        res.send({ message: "Status is required but missing." });
    }

    const result = await JobManager.update(req.params.id, req.body);
    if (result) {
        res.sendStatus(200);
        return;
    }

    res.sendStatus(400);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const JobManager = getRepository(Job);
    const response = await JobManager.delete(req.params.id);

    if (response) {
        res.sendStatus(200);
        return;
    }

    res.sendStatus(500);
});

export default router;
