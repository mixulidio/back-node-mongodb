import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
    id: String,
    nome: {type: String, required: true},
    cpf: Number,
    rg: Number,
    dataNascimento: {type: Date},
    email: {type: String, unique: true},
    
    endereco: {
        cep: String,
        logradouro: String,
        numero: String,
        complemento: String,
    },
    estadoCivil: String,
    profissao: String,


    img: {
        data: Buffer,
        contentType: String
    },
    
    dataCriacao : { type : Date, default: Date.now },

})

const pessoas = mongoose.model('pessoas', schema);

export default pessoas;