import mongoose from "mongoose";
const { Schema } = mongoose;

const cardShema = new Schema({
    name: { type: String },
    imgUrl: { type: String }
});

export default mongoose.model('cards', cardShema);

