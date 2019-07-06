
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dreamsRouter = require('./routes/dreams.router');
const dreamRouter = require('./routes/dream.router');
const themesRouter = require('./routes/themes.router');
const themeRouter = require('./routes/theme.router');
const forgotPass = require('./routes/forgotpassword.router');
const checkToken = require('./routes/checkToken.router');
const resetPassword = require('./routes/resetPassword.router')
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/dreams', dreamsRouter);
app.use('/api/dream', dreamRouter);
app.use('/api/theme', themeRouter);
app.use('/api/themes', themesRouter);
app.use('/api/forgotpassword', forgotPass);
app.use('/api/checktoken', checkToken);
app.use('/api/resetpassword', resetPassword);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
