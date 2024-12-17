// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT, 
});

// Test de la connexion pour s'assurer que tout fonctionne
pool.connect()
  .then(() => {
    console.log('Connexion réussie à la base de données');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données', err);
  });

// Exporte l'objet 'pool' pour l'utiliser ailleurs
module.exports = { pool };
