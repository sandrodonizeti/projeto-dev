const express = require('express')
const router = express.Router()
const funcionarioController = require('../controllers/funcionario.controller');

// obter todos os funcionarios
router.get('/', funcionarioController.findAll);

// criar um novo funcionário
router.post('/', funcionarioController.create);

// obter um único funcionário pelo seu id
router.get('/:id', funcionarioController.findById);

// atualizar um funcionário a partir do seu id
router.put('/:id', funcionarioController.update);

// deletar um funcionário a partir do seu id
router.delete('/:id', funcionarioController.deleteById);

module.exports = router