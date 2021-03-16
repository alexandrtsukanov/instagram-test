const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');

router.post('/newpost', async (req, res) => {
  console.log('ALYO????????');
  console.log(req.session)
  let { photo, body } = req.body;
  let userToPost = await User.findOne({ login: req.session.loginSession });
  let newPostDb = new Post({ author: req.session.loginSession, photo: photo, body: body });
  await newPostDb.save();
  userToPost.posts.push(newPostDb._id);
  await userToPost.save();
  res.sendStatus(200);
});

router.get('/allposts', async (req, res) => {
  console.log(req.session)
  let allPosts = await Post.find();
  res.json(allPosts);
});

module.exports = router
