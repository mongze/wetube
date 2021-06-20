import express from 'express';
import routes from '../routes';
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from '../controllers/videoController';
import { protectorMiddleware, videoUpload } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch); // hexidemical
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route('/:id([0-9a-f]{24})/delete').all(protectorMiddleware).get(deleteVideo);
videoRouter.route(routes.upload).all(protectorMiddleware).get(getUpload).post(videoUpload.single('video'), postUpload);

export default videoRouter;
