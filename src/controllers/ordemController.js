import ordem from "../models/Ordem.js";
import { TickerTagController } from "./tickerTagController.js";

export class OrdemController {

    static trataErro = (err, req, res, resp) => {
        if (!err) {
            res.status(201).send(resp.toJSON())
        } else {
            let msg = err.message
            res.status(500).send({ message: msg })
        }
    }

    static incluir = (req, res) => {
        let reg = new ordem(req.body);
        reg.save((err, resp) => {
            if (!err) {
                TickerTagController.incluirRef(req, res)
                //res.status(201).send(resp.toJSON())
            } else {
                let msg = err.message
                res.status(500).send({ message: msg })
            }
        });
    }

    static incluirLotes = (req, res) => {
        const orders = req.body;
        ordem.insertMany(orders, function(err, result) {
            if (!err) {
                res.status(201).send(result);
            } else {
             res.status(500).send(err.message);
            }
        });
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        ordem.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                // res.status(200).send({ message: "atualizado com sucesso." })
                TickerTagController.incluirRef(req, res)
            } else {
                res.status(500).send({ message: `${err.message} - falha ao atualizar.` })
            }
        })
    }

    static excluir = (req, res) => {
        const id = req.params.id;
        ordem.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'removido com sucesso \n' })
            } else {
                res.status(500).send({ message: `${err.message} - falha ao remover.` })
            }
        })
    }

    static listar = (req, res) => {
        ordem.find((err, model) => {
            res.status(200).json(model)
        }).sort({
            data: -1
        }) // ordena por data desc.
    };

    static consultaPorId = (req, res) => {
        const id = req.params.id;
        ordem.findById(id, (err, model) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Id não localizada.\n` })
            } else {
                res.status(200).send(model)
            }
        })
    }

    static listarPorTicker = (req, res) => {
        const ticker = req.query.ticker
        ordem.find({
            'ticker': ticker?.toUpperCase()
        }, {}, (err, ordem) => {
            res.status(200).send(ordem)
        }
        ).sort({
            data: 1
        })
    }

}