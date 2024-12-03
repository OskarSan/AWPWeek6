import { Router, Request, Response } from "express";
import multer from "multer";
import {Image, IImage } from "../models/Image";
import upload from "../middleware/multer-config";
import { Offer, IOffer } from "../models/Offer";

const router: Router = Router();

type TOffer = {
    title: string
    description: string
    price: number
    imagePath: string | null
}


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

            res.status(201).json({message: "Offer with image created successfully", path: imgPath});
        }
    } catch (error) {
        console.log(error);
    } 
});



router.get("/offers", async (req : Request, res : Response) => {


    try{
        const offers : IOffer[] = await Offer.find();
        const resOffers : TOffer[] = [];
        console.log(offers[0]);
        for(let i = 0; i < offers.length; i++){
            if(offers[i].imageId){
                const image : IImage | null = await Image.findById(offers[i].imageId);
                if (image) {
                    offers[i].imageId = image.path;
                }}else{
                    offers[i].imageId = "";
                }
        }
        res.status(200).json({offers});
    } catch (error) {
        console.log(error);
    }


});

export default router