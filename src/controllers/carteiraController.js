import carteira from "../models/Carteira.js"

class CarteiraController {

    static trataErro = (err, req, res, resp) => {
        if (!err) {
            res.status(201).send(resp.toJSON())
        } else {
            let msg = err.message
            res.status(500).send({ message: msg })
        }
    }

    static incluir = (req, res) => {
        const nomecart = req.body.nomeCarteira;
        let _id = req.body._id;
        if (!_id || _id == "") {
            const cart = new carteira({ nomeCarteira: nomecart })
            cart.save((err, resp) => {
                this.trataErro(err, req, res, resp)
            });
        } else {
            const cart = new carteira({ nomeCarteira: nomecart, _id })
            cart.save((err, resp) => {
                this.trataErro(err, req, res, resp)
            });
        }
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        carteira.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "atualizado com sucesso." })
            } else {
                res.status(500).send({ message: `${err.message} - falha ao atualizar.` })
            }
        })
    }

    static listar = (req, res) => {
        carteira.find((err, regs) => {
            res.status(200).json(regs)
        })
    }

    static consultar = (req, res) => {
        carteira.find({ carteira: req.params.id }, (err, regs) => {
            res.status(200).json(regs)
        }).populate('tickerTag');
    }

    static deleteMany = (req, res) => {
        carteira.deleteMany({}) // carteiraTicker carteira
            .then(() => res.status(200).send("Todos excluidos\n"))
            .catch((err) => res.status(500).send(`Erro ao excluir:  ${err.message}\n`));
    }
    static findByIdAndDelete = (req, res) => {
        carteira.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send("Todos excluidos\n"))
            .catch((err) => res.status(500).send(`Erro ao excluir:  ${err.message}\n`));
    }

}

export default CarteiraController;