const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/ig';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let postsSchema = new mongoose.Schema ({
  author: String,
  photo: String,
  body: String,
  date: Date,
  usersWhoLiked: [{
    type: mongoose.ObjectId, 
    ref: 'users',
  }],
  usersWhoCommented: [{
    type: mongoose.ObjectId, 
    ref: 'users',
  }],
  hashtags: [{
    type: mongoose.ObjectId, 
    ref: 'hashtags',
  }]
});

let Post = mongoose.model('posts', postsSchema);

module.exports = Post;
