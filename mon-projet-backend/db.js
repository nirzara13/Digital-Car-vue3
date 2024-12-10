

// db.js
const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres', // Remplace par ton nom d'utilisateur PostgreSQL
  host: 'localhost', // Hôte de la base de données, ici localhost
  database: 'dcdb', // Remplace par le nom de ta base de données
  password: 'DigitalCar123@', // Remplace par ton mot de passe PostgreSQL
  port: 5432, // Port par défaut de PostgreSQL
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
