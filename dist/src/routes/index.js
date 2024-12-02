"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_1 = require("../models/image");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const router = (0, express_1.Router)();
router.post("/upload", multer_config_1.default.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                status: false,
                data: "No file is selected."
            });
            return;
        }
        const imgPath = req.file.path.replace("public", "");
        const image = new image_1.Image({
            filename: req.file.filename,
            description: req.body.description,
            path: imgPath
        });
        await image.save();
        res.json({ message: "File uploaded successfully", path: imgPath });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
