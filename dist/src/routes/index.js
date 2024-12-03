"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const Offer_1 = require("../models/Offer");
const router = (0, express_1.Router)();
router.post("/upload", multer_config_1.default.single('image'), async (req, res) => {
    try {
        const offer = new Offer_1.Offer({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        console.log(offer);
        await offer.save();
        res.status(201).json({ message: "Offer created successfully", offer });
        /*
        if(!req.file){
            res.status(400).json({
                status: false,
                data: "No file is selected."
            });
            return;
        } else {
            const imgPath : string = req.file.path.replace("public", "");

            const image : IImage = new Image({
                filename: req.file.filename,
                description: req.body.description,
                path: imgPath
            });
            await image.save();
            res.json({message: "Image uploaded successfully", path: imgPath});
        }
    
        */
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
