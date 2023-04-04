import express from "express";
import livros from "./livroRoutes.js";
import autores from "./autorRoutes.js";
import pessoas from "./pessoaRoutes.js";
import tickerTag from "./tickerTagRoutes.js";
import ordem from "./ordemRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) =>{
        res.status(200).send({titulo : "Curso de node"})
    })

    app.use(
        express.json(),
        livros,
        autores,
        pessoas,
        tickerTag,
        ordem,
    )
}

export default routes;