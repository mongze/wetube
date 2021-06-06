import Video from '../models/Video';

export const home = async (req, res) => {
  const vidoes = await Video.find({});
  return res.render('home', { pageTitle: 'Home', vidoes: [] });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  return res.render('search', { pageTitle: 'Search', searchingBy: searchingBy });
};

export const watch = (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  return res.render('watch', { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render('editVideo', { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
