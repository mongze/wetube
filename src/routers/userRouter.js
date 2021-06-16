import express from 'express';
import routes from '../routes';
import {
  users,
  userDetail,
  getEdit,
  postEdit,
  changePassword,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';
import { protectorMiddleware, uploadFiles } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.route(routes.editProfile).all(protectorMiddleware).get(getEdit).post(uploadFiles.single('avatar'), postEdit); // avatar file 가져와 upload 폴더에 저장
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
