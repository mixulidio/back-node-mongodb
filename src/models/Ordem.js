import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    id: String,
    ticker: {type: String, required: true, set: function(v){ return v.toUpperCase();}},
    quantidade: {type: Number, required: true},
    valor: {type: Number, required: true},
    operacao: {type: String, required: true},
    emoluentos: {type: Number},
    liquidacao: {type: Number},
    data : { type : Date, default: Date.now },
})

const ordem = mongoose.model('ordem', schema);

export default ordem;