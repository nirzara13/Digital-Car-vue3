// server.js ou app.js
const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./models'); // Assurez-vous d'importer correctement le modèle User
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Route pour créer un utilisateur
// Exemple d'API pour l'inscription
app.post('/api/auth/signup', async (req, res) => {
  const { email, username, password } = req.body;
  
  try {
    // Valider les données reçues (par exemple, vérifier si l'email est déjà utilisé)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const newUser = await User.create({ email, username, password });
    return res.status(201).json({ message: 'Inscription réussie', user: newUser });

  } catch (error) {
    console.error(error);  // Log pour voir l'erreur dans la console serveur
    return res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
});

