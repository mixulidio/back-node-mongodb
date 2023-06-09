import tickerTag from "../models/TickerTag.js";

export class TickerTagController {

    static trataErro = (err, req, res, resp) => {
        if (!err) {
            res.status(201).send(resp.toJSON())
        } else {
            let msg = err.message
            if (String(msg).search("ticker"))
                msg = `Ticker já cadastrado.`
            res.status(500).send({ message: msg })
        }
    }

    static incluir = (req, res) => {
        let reg = new tickerTag(req.body);
        reg.save((err, resp) => {
            this.trataErro(err, req, res, resp)
        });
    }

    static incluirRef = (req, res) => {
        const ticker = req.body.ticker
        const tags = req.body.tags
        const precoMedio = req.body.precoMedio
        const quantidadeAtual = req.body.quantidadeAtual
        const filter = {'nome': ticker}
        tickerTag.findOne(filter, (err, resFind) =>{
            if(resFind) {
                tickerTag.updateOne(filter, {'tags': tags, 'precoMedio': precoMedio, quantidadeAtual}, (e, r) =>{
                    if (r) {
                        res.status(200).send({ message: "atualizado com sucesso." })
                    } else {
                        res.status(500).send({ message: `${e.message} - falha ao atualizar.` })
                    }
                })
            } else {
                let reg = new tickerTag({nome: ticker, tags: tags, precoMedio, quantidadeAtual})
                reg.save((err, resSave) => {
                    this.trataErro(err, req, res, resSave)
                });
            }
        })
    }

    static atualizaOuIncluiSimples = (req, res) => {
        const ticker = req.body.nome
        const precoMedio = req.body.precoMedio
        const quantidadeAtual = req.body.quantidadeAtual
        const filter = {'nome': ticker}
        tickerTag.findOne(filter, (er, resFind) =>{
            if(er){
                res.status(500).send({ message: `${er.message} - falha 1 ao atualizar ${ticker}` })
            }
            if(resFind) {
                tickerTag.updateOne(filter, {'precoMedio': precoMedio, quantidadeAtual}, (e, r) =>{
                    console.log(r, "updateOne");
                    if (r) {
                        res.status(200).send(r)
                    } else {
                        res.status(500).send({ message: `${e.message} - falha ao atualizar ${ticker}` })
                    }
                })
            } else {
                let reg = new tickerTag({nome: ticker, precoMedio})
                reg.save((err, resSave) => {
                    this.trataErro(err, req, res, resSave)
                });
            }
        })
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        tickerTag.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "atualizado com sucesso." })
            } else {
                res.status(500).send({ message: `${err.message} - falha ao atualizar.` })
            }
        })
    }

    static excluir = (req, res) => {
        const id = req.params.id;
        tickerTag.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'removido com sucesso \n' })
            } else {
                res.status(500).send({ message: `${err.message} - falha ao remover.` })
            }
        })
    }

    static listar = (req, res) => {
        tickerTag.find((err, model) => {
            res.status(200).json(model)
        })
    };

    static listarPorId = (req, res) => {
        const id = req.params.id;
        tickerTag.findById(id, (err, model) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Id não localizada.\n` })
            } else {
                res.status(200).send(model)
            }
        })
    }

    static consultaPorTicker = (req, res) => {
        const ticker = req.query.ticker
        tickerTag.findOne({
            'nome': ticker
        }, {}, (err, tickerTag) => {
            res.status(200).send(tickerTag)
        }
        )

    }
}