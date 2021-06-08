import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, require: true },
    rationg: { type: Number, default: 0, require: true },
  },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
