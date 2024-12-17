// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Modèle Sequelize
// const router = express.Router();

// // Route d'inscription
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
//     }

//     // Vérifie si l'email est déjà utilisé
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
//     }

//     // Hash du mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Création de l'utilisateur
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: 'Inscription réussie', user: { id: user.id, username: user.username, email: user.email } });
//   } catch (error) {
//     console.error('Erreur lors de l\'inscription:', error);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// });

// // Route de connexion
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email et mot de passe requis.' });
//     }

//     // Recherche de l'utilisateur
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//     }

//     // Vérification du mot de passe
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Mot de passe incorrect.' });
//     }

//     // Réponse de succès
//     res.status(200).json({
//       message: 'Connexion réussie',
//       user: { id: user.id, username: user.username, email: user.email },
//     });
//   } catch (error) {
//     console.error('Erreur lors de la connexion:', error);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// });

// module.exports = router;


import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;



