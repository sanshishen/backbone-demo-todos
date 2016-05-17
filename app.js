var express = require('express'),
    port = process.env.PORT || 3000;
var app = express();

// set static files' path
app.use(express.static(__dirname + '/public'));

// 监听端口
app.listen(port);
console.log('app sanshishen is started on port ' + port);