import express from 'express';
import routes from '../routes';
import {
  users,
  userDetail,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';
import { protectorMiddleware, avatarUpload, publicOnlyMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route(routes.editProfile)
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single('avatar'), postEdit); // avatar file 가져와 upload 폴더에 저장
userRouter.route(routes.changePassword).all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
