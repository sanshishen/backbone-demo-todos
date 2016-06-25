var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    todos = require('./routes/todos');

var app = express(),
    port = process.env.PORT || 3000;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// set static files' path
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/todos', todos);

// 监听端口
app.listen(port);
console.log('app sanshishen is started on port ' + port);
