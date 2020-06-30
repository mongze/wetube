import express from 'express';
import routes from '../routes';
import { videos, upload, videoDeatil, editVideo, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDeatil);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;