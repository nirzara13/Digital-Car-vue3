// // module.exports = (req, res, next) => {
// //     if (!req.session || !req.session.user) {
// //         return res.status(401).json({ message: 'Non autorisé' });
// //     }
// //     next();
// // };


  

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../config/sequelize');

const sessionStore = new SequelizeStore({
  db: sequelize,
});

module.exports = session({
  secret: process.env.SECRET_KEY,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
});
