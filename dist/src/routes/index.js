"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Image_1 = require("../models/Image");
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
        if (!req.file) {
            console.log(offer);
            await offer.save();
            res.status(201).json({ message: "Offer created successfully", offer });
        }
        else {
            const imgPath = req.file.path.replace("public", "");
            const image = new Image_1.Image({
                filename: req.file.filename,
                path: imgPath
            });
            await image.save();
            offer.imageId = image._id.toString();
            await offer.save();
            res.status(201).json({ message: "Offer with image created successfully", path: imgPath });
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/offers", async (req, res) => {
    try {
        const offers = await Offer_1.Offer.find();
        const resOffers = [];
        console.log(offers[0]);
        for (let i = 0; i < offers.length; i++) {
            if (offers[i].imageId) {
                const image = await Image_1.Image.findById(offers[i].imageId);
                if (image) {
                    offers[i].imageId = image.path;
                }
            }
            else {
                offers[i].imageId = "";
            }
        }
        res.status(200).json({ offers });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
