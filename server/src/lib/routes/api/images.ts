/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import * as path from "path";
import { getRepository } from "typeorm";
import Image from "../../models/Image";
import Logs, { LogLevels } from "../../util/Logs";

const router = Router();

const parentPath = path.join(__dirname, "../../../../");
const rootPath = "assets/img/images";
const basePath = path.join(parentPath, rootPath);

router.get("/", async (_: Request, res: Response) => {
    const ImageManager = getRepository(Image);
    const images: Image[] = await ImageManager.find();
    res.status(200);
    res.send(images);
});

router.get("/:id", async (req: Request, res: Response) => {
    const ImageManager = getRepository(Image);
    const image: Image = (
        await ImageManager.find({
            where: { id: req.params.id },
            take: 1,
        })
    )[0];

    res.status(200);
    res.send(image);
});

router.post("/", async (req: Request, res: Response) => {
    const ImageManager = getRepository(Image);
    if (req.files) {
        if (!req.body.job_id) {
            res.status(400);
            res.send({ message: "No Job linked." });
            return;
        }

        let file: UploadedFile;

        if (Array.isArray(req.files.image)) {
            file = req.files.image[0];
        } else {
            file = req.files.image;
        }

        const filePath = path.join(rootPath, file.name);
        const fullPath = path.join(basePath, file.name);
        file.mv(fullPath);

        const image: Image[] = ImageManager.create({
            ...req.body,
            file: filePath,
        });

        if (image) {
            try {
                await ImageManager.save(image);
                res.sendStatus(200);
                return;
            } catch (_) {
                Logs.addLog(LogLevels.ERROR, "Error creating Image.");
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
    const ImageManager = getRepository(Image);

    const image: Image = (
        await ImageManager.find({
            where: { id: req.params.id },
        })
    )[0];

    if (image) {
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

            if (image.file.includes(file.name) === false) {
                fs.unlinkSync(path.join(parentPath, image.file));
            }

            file.mv(path.join(basePath, file.name));
        }

        const newImageProperties = {
            text: req.body.text === image.text ? image.text : req.body.text,
            file: filePath ? filePath : image.file,
        };

        const result = await ImageManager.update(
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
    const ImageManager = getRepository(Image);
    const response = await ImageManager.delete(req.params.id);
    if (response) {
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(500);
    }
});

export default router;
