import routes from './routes';

export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
