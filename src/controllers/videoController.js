import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render('home', { pageTitle: 'Home', videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  return res.render('search', { pageTitle: 'Search', searchingBy: searchingBy });
};

export const watch = async (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const video = await Video.findById(id);
  // error 먼저
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  return res.render('editVideo', { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const hasVideo = await Video.exists({ _id: id });

  if (!hasVideo) {
    return res.render('404', { pageTitle: 'Video not found' });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video' });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect('/');
  } catch (error) {
    return res.render('upload', { pageTitle: 'Upload Video', errorMessage: error._message });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};
