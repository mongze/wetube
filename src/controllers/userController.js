import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = 'Join';
  const exists = await User.exists({ $or: [{ username }, { email }] }); // or operator

  if (password !== password2) {
    return res.render('join', { pageTitle, errorMessage: 'Password confirmation does not match' });
  }

  if (exists) {
    return res.render('join', { pageTitle, errorMessage: `This username/email is already taken` });
  }

  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect('/login');
};

export const login = (req, res) => res.render('login', { pageTitle: 'Login' });
export const logout = (req, res) => res.render('logout', { pageTitle: 'Logout' });
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
