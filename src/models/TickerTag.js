import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    id: String,
    nome: {type: String, required: true, set: function(v){ return v.toUpperCase();}},
    tags: [String],
    precoMedio: Number,
    quantidadeAtual: Number,
})

const tickerTag = mongoose.model('tickerTag', schema);

export default tickerTag;