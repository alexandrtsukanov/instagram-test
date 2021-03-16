const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/ig';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let usersSchema = new mongoose.Schema ({
  email: String,
  login: String,
  password: String,
  posts: [{ 
    type: mongoose.ObjectId, 
    ref: 'posts',
  }],
});

let User = mongoose.model('users', usersSchema);

module.exports = User;
