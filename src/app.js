import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import rootRouter from './routers/rootRouter';
import routes from './routes';

const app = express();

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(cookieParser());

app.use(helmet());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true })); // form value를 이해할 수 있도록 함

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);

app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'));
app.use(routes.home, rootRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
