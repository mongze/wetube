import express from 'express';
import routes from '../routes';
import { watch, getEdit, postEdit, getUpload, postUpload } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.route(routes.upload).get(getUpload).post(postUpload);
videoRouter.get(routes.watch, watch);
videoRouter.route(routes.editVideo).get(getEdit).post(postEdit);

export default videoRouter;
