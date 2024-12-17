// // /backend/index.js
// import express from 'express';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import sequelize from './config/sequelize.js';  // Importer la connexion à la base de données
// import { signup, login, logout } from './controllers/authController.js';  // Gérer l'authentification

// dotenv.config();

// const app = express();

// // Middleware pour analyser les requêtes JSON
// app.use(express.json());

// // Middleware de session pour gérer les sessions
// app.use(session({
//   secret: process.env.SESSION_SECRET,  // La clé secrète de session depuis le fichier .env
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false },  // false pour développement (en mode production, mettre true avec HTTPS)
// }));

// // Routes pour l'authentification
// app.post('/api/auth/signup', signup);   // Route pour l'inscription
// app.post('/api/auth/login', login);     // Route pour la connexion
// app.post('/api/auth/logout', logout);   // Route pour la déconnexion

// // Tester la connexion à la base de données et démarrer le serveur
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connexion à la base de données réussie');
//     app.listen(3000, () => {
//       console.log('Serveur démarré sur http://localhost:3000');
//     });
//   })
//   .catch((err) => {
//     console.error('Impossible de se connecter à la base de données :', err);
//   });


// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/Sequelize');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
