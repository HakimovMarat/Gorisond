var express = require('express');
var port = process.env.PORT || 5000;
var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'public');

const indexRouter = require('./routes/index');
const routes = require('./controllers/index');
app.use(express.static(publicDir));
app.use('/', indexRouter);
app.use('/index', routes);

app.listen(port);
module.exports = app;
