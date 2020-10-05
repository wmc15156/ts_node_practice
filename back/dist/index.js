"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export defalut 면 as * 적으면 안됨
// default가 있으면 as *적어 줘야함 as * 
// tsconfig.json esModuleInterop : true면 * as 생략가능 되도록이면 * as를 적어주자
var typeorm_1 = require("typeorm");
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet = require("helmet");
var user_1 = require("./router/user");
dotenv.config();
var app = express();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);
typeorm_1.createConnection();
if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /nodebird\.com$/,
        credentials: true,
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}
;
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nodebird.com' : undefined,
    },
    name: 'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', user_1.default);
app.get('/', function (req, res) {
    res.send('success');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + app.get('port'));
});
//# sourceMappingURL=index.js.map