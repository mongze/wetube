import User from '../models/User';
import fetch from 'node-fetch';
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
  const user = await User.findOne({ username, socialOnly: false });
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
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

export const startGithubLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: 'false',
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  if ('access_token' in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = 'https://api.github.com';
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      // TODO: set notification (There's no verified email)
      return res.redirect('/login');
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    return res.redirect('/login'); // error message 혹은 noti 주면 좋겠네
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

export const getEdit = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarUrl: file ? file.path : avatarUrl, name, email, username, location },
    { new: true }
  );
  req.session.user = updatedUser;
  // TODO: 수정하려는 정보가 무엇인지 판별
  // TODO: 이미 있는 user, email로 업데이트하려는지 확인
  return res.redirect('/users/edit');
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    return res.redirect('/');
  }
  return res.render('changePassword', { pageTitle: 'Change Password' });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);

  if (!ok) {
    return res.status(400).render('changePassword', {
      pageTitle: 'Change Password',
      errorMessage: 'The current password is incorrect',
    });
  }

  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render('changePassword', {
      pageTitle: 'Change Password',
      errorMessage: 'The new password does not match the confirmation',
    });
  }
  user.password = newPassword;
  await user.save();
  // req.session.user.password = user.password; // logout하니까!
  return res.redirect('/logout');
};

export const users = (req, res) => res.render('users', { pageTitle: 'Users' });

export const userDetail = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if(!user) {
    return res.status(400).render('404', {pageTitle: "User not found."});
  }
  return res.render('userDetail', { pageTitle: user.name, user });
}