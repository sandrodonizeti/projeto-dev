const PhotoModel = require('../models/photoModel');

exports.uploadPhoto = async (req, res) => {
    try {
        console.log("REQ.FILE: ", req.file); // Adicionando log para verificar o objeto req.file
        const { filename, path, originalname } = req.file; // Adicionando originalname para acessar a extensão
        const { user_id } = req.body;

        

        console.log("DEBUG PHOTO CONTROLLER: ", filename, path, originalname);
        const photoModel = new PhotoModel();
        await photoModel.create(filename, path, originalname, user_id); // Passando originalname para o método create
        res.redirect('/pratica');        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao realizar o upload da foto.');
    }
};

