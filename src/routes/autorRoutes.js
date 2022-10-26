import express from "express";
import AutorController from "../controllers/autorController.js";

const autorRoutes = express.Router()

autorRoutes
    .get("/autores", AutorController.listarAutores)
    .get("/autores/:id", AutorController.listaAutorPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor)
    .delete("/autores/:id", AutorController.excluirAutor)

export default autorRoutes;