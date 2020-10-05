"use strict";
// export defalut 면 as * 적으면 안됨
// default가 있으면 as *적어 줘야함 as * 
// tsconfig.json esModuleInterop : true면 * as 생략가능 되도록이면 * as를 적어주자
exports.__esModule = true;
var express = require("express");
var app = express();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);
app.get('/', function (req, res, next) {
    res.send('success backend');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + app.get('port'));
});
