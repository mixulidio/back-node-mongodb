import express from "express";
import CarteiraTickerController from "../controllers/carteiraTickerController.js";

const carteiraTickerRoutes = express.Router()

carteiraTickerRoutes
    .post("/carteiraTicker", CarteiraTickerController.incluir)
    .put("/carteiraTicker/:id", CarteiraTickerController.atualizar)
    .get("/carteiraTicker", CarteiraTickerController.listarTodos)
    .get("/carteiraTicker/:id", CarteiraTickerController.listar)
    .delete("/carteiraTicker/deleteMany", CarteiraTickerController.deleteMany)
    .delete("/carteiraTicker/:id", CarteiraTickerController.excluir)

export default carteiraTickerRoutes;