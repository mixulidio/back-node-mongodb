import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // _id: String,
    nomeCarteira: {type: String, required: true},
})

const carteira = mongoose.model('carteira', schema);

export default carteira;