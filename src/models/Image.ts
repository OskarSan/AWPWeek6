
import mongoose, {Document, Schema} from "mongoose";
import path from "path";


interface IImage extends Document {
    filename : string
    description : string
    path: string
    timestamp: Date
    id?: string
}


const ImageSchema: Schema = new Schema({
    filename : {type: String, required: true},
    description : {type: String, required: true},
    path : {type: String, required: true},
    timestamp : {type: Date, default: Date.now}
});


const Image : mongoose.Model<IImage> = mongoose.model<IImage>('Image', ImageSchema);

export {Image, IImage}