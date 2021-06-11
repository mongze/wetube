import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { login, logout, getJoin, postJoin } from '../controllers/userController';

const rootRouter = express.Router();

rootRouter.get(routes.home, home);
rootRouter.get(routes.search, search);
rootRouter.route(routes.join).get(getJoin).post(postJoin);
rootRouter.get(routes.login, login);
rootRouter.get(routes.logout, logout);

export default rootRouter;
