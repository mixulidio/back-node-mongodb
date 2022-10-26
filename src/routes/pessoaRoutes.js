import express from "express";
import { PessoaController } from "../controllers/pessoasController.js";

const pessoaRouter = express.Router()

pessoaRouter
    .post("/pessoas", PessoaController.incluir)
    .put("/pessoas/:id", PessoaController.atualizar)
    .delete("/pessoas/:id", PessoaController.excluir)
    .get("/pessoas", PessoaController.listar)
    .get("/pessoas/:id", PessoaController.listarPorId)


    // TODO
    // email unique
export default pessoaRouter;