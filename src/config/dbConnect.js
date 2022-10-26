import mongoose from "mongoose";

mongoose.connect("mongodb+srv://mixulidio:MongoPaulo2022@cluster0.kpnuiig.mongodb.net/alura-node");

let db = mongoose.connection;
export default db;