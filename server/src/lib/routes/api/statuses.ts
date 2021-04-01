import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import * as path from "path";
import { getRepository } from "typeorm";
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
    if (req.files) {
        let file: UploadedFile;

        if (Array.isArray(req.files.image)) {
            file = req.files.image[0];
        } else {
            file = req.files.image;
        }

        const filePath = path.join(rootPath, file.name);
        const fullPath = path.join(basePath, file.name);
        file.mv(fullPath);

        const status: Status[] = StatusManager.create({
            ...req.body,
            file: filePath,
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
        if (!req.body.job_id) {
            res.status(400);
            res.send({ message: "No Job linked." });
            return;
        }

        let filePath;

        if (req.files) {
            let file: UploadedFile;

            if (Array.isArray(req.files.image)) {
                file = req.files.image[0];
            } else {
                file = req.files.image;
            }

            filePath = path.join(rootPath, file.name);

            if (status.image.includes(file.name) === false) {
                fs.unlinkSync(path.join(parentPath, status.image));
            }

            file.mv(path.join(basePath, file.name));
        }

        const newImageProperties = {
            label: req.body.text === status.label ? status.label : req.body.text,
            image: filePath ? filePath : status.image,
        };

        const result = await StatusManager.update(
            req.params.id,
            newImageProperties
        );

        if (result) {
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(500);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const StatusManager = getRepository(Status);
    const [_, length] = await StatusManager.findAndCount();
    if (length === 1) {
        res.status(400);
        res.send({
            message: "Cannot delete the last status, must havea at least one.",
        });
    }
    const response = await StatusManager.delete(req.params.id);
    if (response) {
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(500);
    }
});

export default router;
