const express = require('express');;
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const keys = require('./config/auth');

require('./models/User');

require('./routes')(app);
require('./config/passport');


app.set('view engine', 'twig');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie('meghuchua'));
app.use(session({
  secret: 'meghuchua',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


const dbUrl = 'mongodb://localhost/smsnew';



mongoose.connect(dbUrl, { useNewUrlParser: true }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT);