
import mongoose, {Document, mongo, Schema} from "mongoose";
import path from "path";


interface IImage extends Document {
    filename : string
    path: string
    _id: mongoose.Types.ObjectId
}


const ImageSchema: Schema = new Schema({
    filename : {type: String, required: true},
    path : {type: String, required: true},
    
});


const Image : mongoose.Model<IImage> = mongoose.model<IImage>('Image', ImageSchema);

export {Image, IImage}