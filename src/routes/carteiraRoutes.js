import express from "express";
import CarteiraController from "../controllers/carteiraController.js";

const carteiraRoutes = express.Router()

carteiraRoutes
    .post("/carteira", CarteiraController.incluir)
    .put("/carteira/:id", CarteiraController.atualizar)
    .get("/carteira", CarteiraController.listar)
    .get("/carteira/:id", CarteiraController.consultar)
    .delete("/carteira/deleteMany", CarteiraController.deleteMany)
    .delete("/carteira/:id/findByIdAndDelete", CarteiraController.findByIdAndDelete)

export default carteiraRoutes;