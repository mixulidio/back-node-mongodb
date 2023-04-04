import mongoose from "mongoose";
// 635178034724c1716938644d
//mongoose.connect("mongodb+srv://mixulidio:MongoPaulo2023@cluster0.kpnuiig.mongodb.net/alura-node");
mongoose.connect("mongodb+srv://mixulidio:MongoPaulo2023@cluster0.kpnuiig.mongodb.net/alura-node");

let db = mongoose.connection;
export default db;