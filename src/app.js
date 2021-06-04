import './db';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { localsMiddleware } from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';

const app = express();

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(cookieParser());

app.use(helmet());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true })); // form value를 이해할 수 있도록 함

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
