const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), userController.uploadPhoto);

exports.uploadPhoto = async (req, res) => {
  try {
    // Salvando o caminho da foto no banco de dados
    const user = new User({
      username: req.body.username,
      photo: req.file.path,
    });
    await user.save();
    res.send('Upload realizado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao realizar o upload.');
  }
};
const UserSchema = new mongoose.Schema({
  username: String,
  photo: String,
});

module.exports = mongoose.model('User', UserSchema);