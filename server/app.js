const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

// const User = require('./models/users')
// const Post = require('./models/posts')

const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');

mongoose.connect('mongodb://localhost:27017/ig', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

const { urlencoded } = require('express');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'key123',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// app.post('/signup', async (req, res) => {
//   let { email, login, password } = req.body;
//   let newUserDb = new User({ email, login, password });
//   await newUserDb.save();
//   req.session.loginSession = login;
//   console.log(req.session.loginSession)
//   res.send(req.session.loginSession);
// });

// // app.post('/signup', async (req, res) => {
// //   let { login } = req.body;
// //   let newUserDb = new User({ login });
// //   await newUserDb.save();
// //   res.send(newUserDb.login);
// // });

// app.post('/login', async (req, res) => {
//   let { login, password } = req.body;
//   let userToLogIn = await User.findOne({ login, password });
//   if (userToLogIn) {
//     req.session.loginSession = userToLogIn.login;
//     res.send(req.session.loginSession);
//   }
// });

// app.get('/auth', (req, res) => {
//   console.log('=======>', req.session)
//   let userAuth = req.session.loginSession;
//   console.log(userAuth)
//   // if (userAuth) {
//     res.send(userAuth);
//   // }
// });

// app.post('/newpost', async (req, res) => {
//   console.log('ALYO????????');
//   console.log(req.session)
//   let { photo, body } = req.body;
//   let newPostDb = new Post({ photo: photo, body: body });
//   await newPostDb.save();
//   let userToPost = await User.findOne({ login: req.session.loginSession });
//   userToPost.posts.push(newPostDb._id);
//   await userToPost.save();
//   res.json(newPostDb);
// });

// app.get('/allposts', async (req, res) => {
//   let allPosts = await Post.find();
//   res.json(allPosts);
// });

// app.get('/about', (req, res) => {
//   req.session.destroy()
//   res.send('AAAAA')
// })

app.use((req, res, next) => {
  res.locals.loginLocals = req.session?.loginSession;
  next();
})

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080, () => {
  console.log('server started')
});
