import pessoas from "../models/Pessoa.js";

export class PessoaController {

    static trataErro = (err, req, res, resp) => {
        if(!err){
            res.status(201).send(resp.toJSON())
        } else {
            let msg = err.message
            if(String(msg).search("email"))
                msg = `E-mail já utilizado.`
            res.status(500).send({message: msg})
        }
    }
    
    static incluir = (req, res) => {
        let pessoa = new pessoas(req.body);
        pessoa.save((err, resp) => {
            this.trataErro(err, req, res, resp)
        });
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        pessoas.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "atualizado com sucesso."})
            } else {
                res.status(500).send({message: `${err.message} - falha ao atualizar.`})
            }
        })
    }



    static excluir = (req, res) => {
        const id = req.params.id;
        pessoas.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'removido com sucesso \n'})
            } else {
                res.status(500).send({message: `${err.message} - falha ao remover.`})
            }
        })
    }

    static listar = (req, res) => {
        pessoas.find((err, model) => {
            res.status(200).json(model)
        })
    };

    static listarPorId = (req, res) => {
        const id = req.params.id;
        pessoas.findById(id, (err, model) => {
            if(err){
                res.status(400).send({message: `${err.message} - Id não localizada.\n`})
            } else {
                res.status(200).send(model)
            }
        })
    }
}