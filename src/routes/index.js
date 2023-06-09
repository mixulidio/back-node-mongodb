import express from "express";
import autores from "./autorRoutes.js";
import carteiraRoutes from "./carteiraRoutes.js";
import carteiraTickerRoutes from "./carteiraTickerRoutes.js";
import livros from "./livroRoutes.js";
import ordem from "./ordemRoutes.js";
import pessoas from "./pessoaRoutes.js";
import tickerTag from "./tickerTagRoutes.js";

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
        carteiraRoutes,
        carteiraTickerRoutes,
    )
}

export default routes;