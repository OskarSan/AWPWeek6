import { Router, Request, Response } from "express";
import multer from "multer";
import {Image, IImage } from "../models/Image";
import upload from "../middleware/multer-config";
import { Offer, IOffer } from "../models/Offer";

const router: Router = Router();


router.post("/upload", upload.single('image'), async (req : Request, res : Response) => {
    try{
        
        const offer : IOffer = new Offer({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });


        if(!req.file){
            
            
            console.log(offer);
            await offer.save();
            res.status(201).json({message: "Offer created successfully", offer});
            
    
        } else {
            const imgPath : string = req.file.path.replace("public", "");

            const image : IImage = new Image({
                filename: req.file.filename,
                path: imgPath
            });
            await image.save();

            offer.imageId = image._id.toString();
            await offer.save();

            res.json({message: "Offer with image created successfully", path: imgPath});
        }
    
    
        
     
        
        

        


    } catch (error) {
        console.log(error);
    } 
});

export default router