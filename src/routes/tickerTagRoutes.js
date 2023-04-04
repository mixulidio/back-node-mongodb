import express from "express";
import { TickerTagController } from "../controllers/tickerTagController.js";

const tickerTagRouter = express.Router()

tickerTagRouter
    .post("/tickerTag", TickerTagController.incluir)
    .post("/tickerTag/atualizaOuIncluiSimples", TickerTagController.atualizaOuIncluiSimples)
    .put("/tickerTag/:id", TickerTagController.atualizar)
    .delete("/tickerTag/:id", TickerTagController.excluir)
    .get("/tickerTag/busca", TickerTagController.consultaPorTicker)
    .get("/tickerTag", TickerTagController.listar)
    .get("/tickerTag/:id", TickerTagController.listarPorId)


export default tickerTagRouter;