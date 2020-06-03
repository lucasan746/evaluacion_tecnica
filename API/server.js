const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");
const SocketIO = require('socket.io');
require('./config/passport');
const funcTurnos = require("./controllers/queueController");


const app = express();

app.set('view engine','pug');
app.set('views', path.join(__dirname,'./views'));

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/evaluacion_tecnica', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

app.use('/',routes());

const server = app.listen(4000, ()=>{
	console.log("Servidor conectado");
});

const io = SocketIO(server);

io.on('connection', (socket)=> {
  console.log('nueva conexion');
  socket.on("message", (message) => {
    socket.broadcast.emit("response", (message))
    console.log(message);
  });
});

io.on('connection', (socket2)=> {
  console.log('nueva conexion');
  socket2.on("newRequest", (message) => {
  funcTurnos.getTurnos().then(function(result){
    socket2.emit("response", (result))
    console.log(result);
  });
  });
});
