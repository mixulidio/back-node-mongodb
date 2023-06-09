import mongoose from "mongoose";

const schema = new mongoose.Schema({
    //_id: String,
    carteira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carteira",
        required: true,
    },
    tickerTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickerTag",
        required: true,
    },
    peso: {
        type: Number,
    },
    precoTeto: Number
}, { unique: true });

const carteiraTicker = mongoose.model('carteiraTicker', schema);

export default carteiraTicker;