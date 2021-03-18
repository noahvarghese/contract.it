import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import Job from "../../models/Job";
import Logs, { LogLevels } from "../../util/Logs";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const JobManager = getRepository(Job);
    const jobs: Job[] = await JobManager.find();
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
    const JobManager = getRepository(Job);

    if (!req.body.status_id) {
        res.status(400);
        res.send({ message: "Status is required but missing." });
    }

    const job: Job[] = JobManager.create({ ...req.body });

    if (job) {
        try {
            await JobManager.save(job);
            res.sendStatus(200);
            return;
        } catch (_) {
            Logs.addLog("Error creating job.", LogLevels.ERROR);
            res.sendStatus(400);
            return;
        }
    }
    res.sendStatus(500);
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
