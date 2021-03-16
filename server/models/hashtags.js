const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/ig';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let hashtagsSchema = new mongoose.Schema ({
  name: String,
});

let Hashtag = mongoose.model('hashtags', hashtagsSchema);

module.exports = Hashtag;
