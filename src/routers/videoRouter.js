import express from 'express';
import routes from '../routes';
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch); // hexidemical
videoRouter.route('/:id([0-9a-f]{24})/edit').get(getEdit).post(postEdit);
videoRouter.route('/:id([0-9a-f]{24})/delete').get(deleteVideo);
videoRouter.route(routes.upload).get(getUpload).post(postUpload);

export default videoRouter;
