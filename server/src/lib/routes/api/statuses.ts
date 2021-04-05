import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import * as path from "path";
import { getRepository } from "typeorm";
import Job from "../../models/Job";
import Status from "../../models/Status";
import Logs, { LogLevels } from "../../util/Logs";

const router = Router();

const parentPath = path.join(__dirname, "../../../../");
const rootPath = "assets/img/statuses";
const basePath = path.join(parentPath, rootPath);

router.get("/", async (_: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    const statuses: Status[] = await StatusManager.find();
    res.status(200);
    res.send(statuses);
});

router.get("/:id", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    const status: Status = (
        await StatusManager.find({
            where: { id: req.params.id },
            take: 1,
        })
    )[0];

    res.status(200);
    res.send(status);
});

router.post("/", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    console.log(req.files)
    if (req.files) {
        let file: UploadedFile;

        if (Array.isArray(req.files.image)) {
            file = req.files.image[0];
        } else {
            file = req.files.image;
        }

        // const filePath = path.join(rootPath, file.name);
        const fullPath = path.join(basePath, file.name);
        file.mv(fullPath);

        const status: Status[] = StatusManager.create({
            ...req.body,
            image: file.name,
        });

        if (status) {
            try {
                await StatusManager.save(status);
                res.sendStatus(200);
                return;
            } catch (_) {
                Logs.addLog("Error creating Image.", LogLevels.ERROR);
                res.status(500);
                res.send({ message: "Error uploading image." });
                return;
            }
        } else {
            res.status(400);
            res.send({ message: "No image found." });
        }
    }

    res.sendStatus(500);
});

router.put("/:id", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);

    const status: Status = (
        await StatusManager.find({
            where: { id: req.params.id },
        })
    )[0];


    if (status) {
        let fileName;

        if (req.files) {
            let file: UploadedFile;

            if (Array.isArray(req.files.image)) {
                file = req.files.image[0];
            } else {
                file = req.files.image;
            }

            if (status.image.includes(file.name) === false) {
                fs.unlinkSync(path.join(parentPath, rootPath, status.image));
            }

            file.mv(path.join(basePath, file.name));
            fileName = file.name;
        }

        const newStatusProperties = {
            label: req.body.label === status.label ? status.label : req.body.label,
            image: fileName ? fileName : status.image,
        };

        status.label = newStatusProperties.label;
        status.image = newStatusProperties.image;

        const result = await StatusManager.save({
            ...status
        })

        if (result) {
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(500);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    const JobManager = getRepository(Job);

    const jobs = await JobManager.count({ where: { status: req.params.id } });

    if (jobs > 0) {
        res.status(400);
        res.send({ message: "Unable to delete status as there are jobs that still have this status. Please move all jobs to another status before deleteing" })
        return;
    }

    const [statuses, length] = await StatusManager.findAndCount();
    if (length === 1) {
        res.status(400);
        res.send({
            message: "Cannot delete the last status, must havea at least one.",
        });
        return;
    } else if (length < 1) {
        res.status(400);
        res.send({
            message: "No status found."
        });
        return;
    }

    fs.unlinkSync(path.join(parentPath, rootPath, statuses[0].image));
    const response = await StatusManager.delete(req.params.id);
    if (response) {
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(500);
    }
});

export default router;
