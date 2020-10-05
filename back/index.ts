// export defalut 면 as * 적으면 안됨
// default가 있으면 as *적어 줘야함 as * 
// tsconfig.json esModuleInterop : true면 * as 생략가능 되도록이면 * as를 적어주자
import {createConnection} from "typeorm";
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import { Request, Response, NextFunction, Application } from 'express';

import { sequelize } from './models';

dotenv.config();

const app: Application = express();
const prod: boolean = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);

sequelize.sync({
  force: false
}).then(() => {
  console.log('연결되었습니다.')
})
.catch((err:Error) => {
  console.log(err)
})

if(prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: /nodebird\.com$/,
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
};

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(expressSession({
  resave: false,
  saveUninitialized: false, 
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: prod ? '.nodebird.com' : undefined,
  },
  name: 'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('success');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});
