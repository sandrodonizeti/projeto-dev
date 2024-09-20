const UserModel = require('../models/userModel');
const passwordService = require('../services/passwordService');

class AuthController {
    static loginForm(req, res) {
        res.render('auth/login');
    }
    static async login(req, res) {
        try {
            const { usernameOrEmail, password } = req.body;
            const user = await UserModel.findByUsernameOrEmail(usernameOrEmail);
            if (!user) {
                res.redirect('/usuarios/cadastrar')
                //return res.render('auth/login', { errorMessage: 'Usuário não encontrado.', usernameOrEmail: usernameOrEmail });
            }
            const isValidPassword = await passwordService.comparePasswords(password, user.password);
            if (!isValidPassword) {
                res.redirect('/usuarios/cadastrar')
                //return res.render('auth/login', { errorMessage: 'Senha incorreta.', usernameOrEmail: usernameOrEmail });
            }
            req.session.user = user;
            // (user.sex === 'Feminino') {
            // res.redirect('/pratica'); // Substitua 'pagina_feminina' pelo caminho correto
            //} else {
            //res.redirect('/pratica'); // Substitua 'pagina_masculina' pelo caminho correto
            //}
            // }
            //retorna o login para a pasta escolhida
            return res.redirect('/pratica');
        } catch (error) {
            console.log(error);
            return res.status(500).render('error.ejs', { error });
        }
    }
    static logout(req, res) {
        try {
            req.session.destroy();
            return res.render('auth/logout');
        } catch (error) {
            console.log(error);
            return res.status(500).render('error.ejs', { error });
        }
    }
}
module.exports = AuthController;