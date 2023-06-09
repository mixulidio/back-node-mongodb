import carteira from "../models/Carteira.js"
import carteiraTicker from "../models/CarteiraTicker.js"

class CarteiraTickerController {

    static trataErro = (err, req, res, resp) => {
        if (!err) {
            res.status(201).send(resp?.toJSON())
        } else {
            let msg = err.message
            res.status(500).send({ message: msg })
        }
    }

    // TODO unique na coluna ticker para aquela carteira, não funcionou, não precisa por enquanto
    static incluir = (req, res) => {
        const idTicker = req.body.idTicker;
        const peso = req.body.peso;
        const nomecart = req.body.nomeCarteira;
        const precoTeto = req.body.precoTeto;
        let idcart = req.body.idcart;
        const _id = req.body._id
        if (!idcart || idcart == "") {
            const cart = new carteira({ nomeCarteira: nomecart })
            cart.save();
            idcart = cart._id;
        }
        let cartTick = new carteiraTicker({ carteira: idcart, tickerTag: idTicker, peso, precoTeto });
        if (_id) {
            cartTick._id = _id;
            carteiraTicker.findByIdAndUpdate(_id, cartTick,
                { upsert: true, new: true }, // cria novo se não encontrou
                (err, resp) => {
                    this.trataErro(err, req, res, resp)
                })
        } else {
            cartTick.save((err, resp) => {
                this.trataErro(err, req, res, resp)
            });
        }
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        carteiraTicker.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "atualizado com sucesso." })
            } else {
                res.status(500).send({ message: `${err.message} - falha ao atualizar.` })
            }
        })
    }

    static listarTodos = (req, res) => {
        carteiraTicker.find((err, regs) => {
            res.status(200).json(regs)
        })
    }

    static listar = (req, res) => {
        carteiraTicker.find({ carteira: req.params.id }, (err, regs) => {
            res.status(200).json(regs)
        }).populate('tickerTag');
    }

    static deleteMany = (req, res) => {
        carteiraTicker.deleteMany({}) // carteiraTicker carteira
            .then(() => res.status(200).send("Todos excluidos\n"))
            .catch((err) => res.status(500).send(`Erro ao excluir:  ${err.message}\n`));
    }
    static findByIdAndDelete = (req, res) => {
        carteiraTicker.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send("Todos excluidos\n"))
            .catch((err) => res.status(500).send(`Erro ao excluir:  ${err.message}\n`));
    }
    static excluir = (req, res) => {
        const id = req.params.id;
        carteiraTicker.findByIdAndDelete(id, (err, resp) => {
            this.trataErro(err, req, res, resp)
        })
    }

}

export default CarteiraTickerController;