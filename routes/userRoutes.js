const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');
const multer = require('multer');


const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/', async function (req, res, next) {
  try {
    res.render('index', { user });
  } catch (error) {
    console.error(error);
      const { user } = req.session;
  res.sendStatus(500);
  }
});

router.get('/pratica', async function (req, res, next) {
  try {
    const user_id = req.session.user.id;
    const sql = `
      SELECT message.content, 
             message.filename,
             message.path,
             DATE_FORMAT(message.createdAt, '%d/%m %H:%i') AS createdAt, 
             user.username,
             user.photo
      FROM message 
      LEFT JOIN user ON message.user_id = user.id`;
    const [rows] = await pool.query(sql, [user_id]);
    console.log(rows);
    res.render('users/pratica', { mensagens: rows, user_id: user_id, user: req.session.user }); // Passando req.session.user
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/pratica1', async function (req, res, next) {
  try {
    const user_id = req.session.user.id;
    const sql = `
      SELECT message.content, 
              message.filename,
              message.path,
             DATE_FORMAT(message.createdAt, '%d/%m %H:%i') AS createdAt, 
             user.username,
             user.photo
      FROM message 
      LEFT JOIN user ON message.user_id = user.id`;
    const [rows] = await pool.query(sql, [user_id]);
    console.log(rows);
    res.render('users/pratica1', { mensagens: rows, user_id: user_id, user: req.session.user }); // Passando req.session.user
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/pratica', async function (req, res, next) {
  try {
    const sql = "insert into message (content,user_id) values (?, ?)";
    const values = [req.body.mensagem, req.body.user_id];
    const [rows] = await pool.query(sql, values);
    res.redirect('/pratica');
  } catch (error) {
    console.error(error);
    res.send('Ocorreu um erro ao enviar a mensagem.');
  }
});

module.exports = router;
