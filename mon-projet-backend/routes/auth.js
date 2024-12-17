import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration du middleware de session
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 1 heure
}));

// Route d'Inscription
router.post(
  '/register',
  [
    check('username', 'Veuillez inclure un nom d\'utilisateur').not().isEmpty(),
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Le mot de passe doit être au moins de 10 caractères, contenir une majuscule, une minuscule, deux chiffres et deux caractères spéciaux')
      .isLength({ min: 10 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/)
      .withMessage('Le mot de passe est trop faible, il doit contenir : 1 majuscule, 1 minuscule, 2 chiffres et 2 caractères spéciaux'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    console.log('Registration request:', { username, email, password });

    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'Cet utilisateur existe déjà.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Créer une session pour l'utilisateur
      req.session.user = { id: user.id, username: user.username, email: user.email };

      // Renvoyer une réponse avec succès et une redirection vers la page de connexion
      console.log('User registered successfully. Redirecting to login.');
      res.status(201).json({ msg: 'Utilisateur créé avec succès', redirect: '/login' });

    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
);

// Route de Connexion
router.post(
  '/login',
  [
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('password', 'Veuillez entrer un mot de passe').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login request:', { email, password });

    try {
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Identifiants invalides.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Identifiants invalides.' });
      }

      // Créer une session pour l'utilisateur
      req.session.user = { id: user.id, username: user.username, email: user.email };

      // Réponse de succès et redirection vers le tableau de bord
      console.log('Login successful, redirecting to dashboard');
      res.status(200).json({ msg: 'Connexion réussie', redirect: '/dashboard' });

    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
);

export default router;
