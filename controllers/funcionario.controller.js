const Funcionario = require('../models/funcionario.model');

const findAll = (req, res) => {
    Funcionario.findAll((err, funcionario) => {
        
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', funcionario);
        res.json(funcionario);
    });
};

const create = (req, res) => {
    const newFuncionario = new Funcionario(req.body);

    // handle null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    } else {
        Funcionario.create(newFuncionario, (err, funcionario) => {
            if (err)
                res.send(err);
            res.json({ error: false, message: "Funcionário cadastrado com sucesso!", data: funcionario });
        });
    }
};

const findById = (req, res) => {
    Funcionario.findById(req.params.id, (err, funcionario) => {
        if (err)
            res.send(err);
        res.json(funcionario);
    });
};

const update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Todos os campos obrigatórios devem ser preenchidos' });
    } else {
        // cria um objeto com apenas os campos enviados na requisição
        const updateData = { ...req.body };

        // atualiza o funcionário com os dados enviados
        Funcionario.update(req.params.id, updateData, (err, funcionario) => {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Funcionário atualizado com sucesso!' });
        });
    }
};

const deleteById = (req, res) => {
    Funcionario.deleteById(req.params.id, (err, funcionario) => {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Funcionário deletado com sucesso!' });
    });
};

module.exports = { findAll, create, findById, update, deleteById };