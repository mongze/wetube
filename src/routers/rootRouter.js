import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { logout, getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';
import { publicOnlyMiddleware, protectorMiddleware } from '../middlewares';

const rootRouter = express.Router();

rootRouter.get(routes.home, home);
rootRouter.get(routes.search, search);
rootRouter.route(routes.join).all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route(routes.login).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get(routes.logout, protectorMiddleware, logout);

export default rootRouter;
