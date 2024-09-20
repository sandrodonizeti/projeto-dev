const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const session = require('express-session');

const checkLoggedIn = require('./middlewares/checkLoggedIn');
const indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("filename app.js");   
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) { 
    console.log("filename app.js");   
    cb(null, file.originalname);
  },
});




const upload = multer({ storage: storage });
require('dotenv').config();
app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true,
}));


app.use(checkLoggedIn);
app.use('/', indexRouter);
app.use('/usuarios', userRoutes);
app.use('/autenticacao', authRoutes);
app.post('/upload', upload.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file selected.');
  }
  return res.redirect('/pratica');
});
app.post('/upload', upload.single('file'), function (req, res) {
  if (req.file) {
    let fileContent = base64_encode(req.file.filename);
    db.fileExample.create(
      { fileName: req.file.originalname, fileExt: req.file.mimetype, file: fileContent }
    ).then(function () {
      console.log('Success!');
    }, function (error) {
      console.log(error); res.sendStatus(500);
    });
  }
  return res.redirect('/pratica');
});
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.error = {
    message: err.message,
    status: err.status || 500,
    stack: req.app.get('env') === 'development' ? err.stack : '',
  };

  res.status(res.locals.error.status);
  res.render('error');
});
module.exports = app;