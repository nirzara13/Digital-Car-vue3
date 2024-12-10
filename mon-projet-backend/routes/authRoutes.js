// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Modèle de l'utilisateur
// const router = express.Router();

// // Route de connexion
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Cherche l'utilisateur par email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: 'Utilisateur non trouvé' });
//     }

//     // Compare le mot de passe
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Mot de passe incorrect' });
//     }

//     // Crée et envoie le token JWT
//     const payload = { user: { id: user.id } }; // Charge utile avec l'ID de l'utilisateur
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Erreur du serveur' });
//   }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../db'); // Connexion à la base de données
const router = express.Router();

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Date actuelle
    const createdAt = new Date().toISOString(); // Récupère la date actuelle au format ISO

    // Insertion dans la table "users"
    const result = await pool.query(
      'INSERT INTO users (username, email, password, createdAt) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, createdAt] // Ajoute la date dans la requête
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: result.rows[0] });
  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




// Route pour la connexion
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
    }

    // Vérification de l'utilisateur
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const user = result.rows[0];

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    res.status(200).json({
      message: 'Connexion réussie',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
