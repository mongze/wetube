import express from 'express';
import routes from '../routes';
import { videos, upload, watch, getEdit, postEdit, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.watch, watch);
videoRouter.route(routes.editVideo).get(getEdit).post(postEdit);

export default videoRouter;
