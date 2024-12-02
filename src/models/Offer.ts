
import mongoose, {Document, Schema} from "mongoose";



interface IOffer extends Document {
    title: string
    description: string
    price: number
    date: Date
    id?: string
}

const OfferSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});


const Offer : mongoose.Model<IOffer> = mongoose.model<IOffer>('Offer', OfferSchema);

export {Offer, IOffer}

