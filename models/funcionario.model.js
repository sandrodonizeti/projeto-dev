const db = require('../config/database.config');

// criar a classe funcionário
class Funcionario {
    constructor(funcionario) {
        this.nome = funcionario.nome;
        this.sobrenome = funcionario.sobrenome;
        this.email = funcionario.email;
        this.telefone = funcionario.telefone;
        this.funcao = funcionario.funcao;
        this.salario = funcionario.salario;
        this.estado = funcionario.estado || true;
        this.dataCadastro = new Date();
        this.dataAtualizacao = new Date();
    }
}

// buscar todos os funcionários
Funcionario.findAll = (result) => {
    db.query("SELECT * FROM Funcionario", (err, res) => {
        if (err) {
            console.log("Erro ao buscar todos os funcionarios: ", err);
            result(null, err);
        } else {
            console.log("Funcionários: ", res);
            result(null, res);
        }
    });
};

// buscar funcionário pelo id
Funcionario.findById = (id, result) => {
    db.query("SELECT * FROM Funcionario WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Erro ao buscar o funcionario de id ", id, ": ", err);
            result(err, null);
        } else if (res.length) {
            console.log("Funcionario encontrado: ", res[0]);
            result(null, res[0]);
        } else {
            console.log("Funcionario não encontrado para o id ", id);
            result({ kind: "not_found" }, null);
        }
    });
};

// criar um novo funcionário
Funcionario.create = (newFuncionario, result) => {
    db.query("INSERT INTO Funcionario SET ?", newFuncionario, (err, res) => {
        if (err) {
            console.log("Erro ao criar um novo funcionario: ", err);
            result(err, null);
        } else {
            console.log("Funcionario criado: ", { id: res.insertId, ...newFuncionario });
            result(null, { id: res.insertId, ...newFuncionario });
        }
    });
};

// atualizar um funcionário
Funcionario.update = (id, funcionario, result) => {
    funcionario.dataAtualizacao = new Date();
    db.query("UPDATE Funcionario SET ? WHERE id = ?", [funcionario, id], (err, res) => {
        if (err) {
            console.log("Erro ao atualizar o funcionario de id ", id, ": ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            console.log("Funcionario não encontrado para o id ", id);
            result({ kind: "not_found" }, null);
        } else {
            console.log("Funcionario atualizado: ", { id: id, ...funcionario });
            result(null, { id: id, ...funcionario });
        }
    });
};

// deletar um funcionário
Funcionario.deleteById = (id, result) => {
    db.query("DELETE FROM Funcionario WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Erro ao deletar o funcionário de id ", id, ": ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            console.log("Funcionário não encontrado para o id ", id);
            result({ kind: "not_found" }, null);
        } else {
            console.log("Funcionário deletado com id: ", id);
            result(null, res);
        }
    });
};


module.exports = Funcionario;
