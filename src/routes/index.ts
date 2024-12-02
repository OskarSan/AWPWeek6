import { Router, Request, Response } from "express";
import multer from "multer";
import {Image, IImage } from "../models/Image";
import upload from "../middleware/multer-config";

const router: Router = Router();


router.post("/upload", upload.single('image'), async (req : Request, res : Response) => {
    try{
        if(!req.file){
            res.status(400).json({
                status: false,
                data: "No file is selected."
            });
            return;
        }
    
        const imgPath : string = req.file.path.replace("public", "");

        const image : IImage = new Image({
            filename: req.file.filename,
            description: req.body.description,
            path: imgPath
        });

        await image.save();

        res.json({message: "File uploaded successfully", path: imgPath});
    } catch (error) {
        console.log(error);
    } 
});

export default router