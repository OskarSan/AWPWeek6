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


router.get("/offers", async (req: Request, res: Response) => {
    try {
        const offers: IOffer[] = await Offer.find();
        const resOffers: TOffer[] = [];

        for (let i = 0; i < offers.length; i++) {
            let imagePath: string | null = null;
            if (offers[i].imageId) {
                const image: IImage | null = await Image.findById(offers[i].imageId);
                if (image) {
                    
                    imagePath = image.path.replace(/\\/g, '/');;
                    console.log(imagePath, "polku AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                }
            }

            const tOffer: TOffer = {
                title: offers[i].title,
                description: offers[i].description,
                price: offers[i].price,
                imagePath: imagePath
            };

            resOffers.push(tOffer);
        }

        res.status(200).json(resOffers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
});

export default router