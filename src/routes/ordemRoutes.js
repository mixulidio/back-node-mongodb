import express from "express";
import { OrdemController } from "../controllers/ordemController.js";

const ordemRouter = express.Router()

ordemRouter
    .post("/ordem", OrdemController.incluir)
    .post("/ordens", OrdemController.incluirLotes)
    .put("/ordem/:id", OrdemController.atualizar)
    .delete("/ordem/:id", OrdemController.excluir)
    .get("/ordem/busca", OrdemController.listarPorTicker)
    .get("/ordem", OrdemController.listar)
    .get("/ordem/:id", OrdemController.consultaPorId)


export default ordemRouter;