import express from 'express';
import routes from '../routes';
import {
  users,
  userDetail,
  editProfile,
  changePassword,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
