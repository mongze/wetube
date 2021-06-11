import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { logout, getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';

const rootRouter = express.Router();

rootRouter.get(routes.home, home);
rootRouter.get(routes.search, search);
rootRouter.route(routes.join).get(getJoin).post(postJoin);
rootRouter.route(routes.login).get(getLogin).post(postLogin);
rootRouter.get(routes.logout, logout);

export default rootRouter;
