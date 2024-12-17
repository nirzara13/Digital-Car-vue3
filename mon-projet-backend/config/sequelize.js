// require('dotenv').config();  // Pour charger les variables d'environnement

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: 'postgres',
//   logging: console.log,  // Désactive si tu ne veux pas voir les logs SQL
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connexion à la base de données réussie');
//   })
//   .catch(err => {
//     console.error('Impossible de se connecter à la base de données :', err);
//   });

// module.exports = sequelize;


// config/Sequelize.js
// config/sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

export default sequelize;
