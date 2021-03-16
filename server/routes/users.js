const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');

router.post('/signup', async (req, res) => {
  console.log(req.session)
  let { email, login, password } = req.body;
  let newUserDb = new User({ email, login, password });
  await newUserDb.save();
  req.session.login = login;
  console.log(req.session)
  res.sendStatus(200);
});

router.post('/login', async (req, res) => {
  let { login, password } = req.body;
  let userToLogIn = await User.findOne({ login, password });
  if (userToLogIn) {
    req.session.loginSession = userToLogIn.login;
    res.sendStatus(200);
  }
});

router.get('/auth', (req, res) => {
  console.log('WHERE IS LOGIN ?????=======>', req.session)
  let userAuth = req.session.loginSession;
  console.log(userAuth)
  if (userAuth) {
    return res.send(userAuth);
  }
});

module.exports = router
