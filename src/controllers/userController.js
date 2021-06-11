import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = 'Join';
  const exists = await User.exists({ $or: [{ username }, { email }] }); // or operator

  if (password !== password2) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'Password confirmation does not match' });
  }

  if (exists) {
    return res.status(400).render('join', { pageTitle, errorMessage: `This username/email is already taken` });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', { pageTitle, errorMessage: error._message });
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = 'Login';
  const user = await User.findOne({ username });
  const ok = await bcrypt.compare(password, user.password);

  if (!user) {
    return res
      .status(400)
      .render('login', { pageTitle, errorMessage: 'An account with this username does not exists.' });
  }

  if (!ok) {
    return res.status(400).render('login', { pageTitle, errorMessage: '❌ password is not correct ❌' });
  }

  // success login
  res.redirect('/');
};

export const logout = (req, res) => res.render('logout', { pageTitle: 'Logout' });
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
