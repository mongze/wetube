// import { videos } from '../db';

let videos = [
  {
    title: 'First Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 59,
    id: 1,
  },
  {
    title: 'Second Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 1,
    id: 2,
  },
  {
    title: 'Third Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 59,
    id: 3,
  },
];

export const home = (req, res) => {
  return res.render('home', { pageTitle: 'Home', videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  return res.render('search', { pageTitle: 'Search', searchingBy: searchingBy });
};

export const watch = (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const video = videos[id - 1];
  return res.render('watch', { pageTitle: `Watching: ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render('editVideo', { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  video[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
