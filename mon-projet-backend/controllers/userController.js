// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const SECRET_KEY = 'votre_clé_secrète'; // Utilisez une clé secrète plus forte dans la production

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashedPassword });
//     const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(201).json({ token, user: newUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

//     const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({ token, user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY || 'votre_clé_secrète';

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Vérification des champs requis
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
    }

    // Hacher le mot de passe et créer un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Générer un token JWT
    const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

    // Supprimer le mot de passe avant de renvoyer les données utilisateur
    const userToReturn = { ...newUser.toJSON() };
    delete userToReturn.password;

    res.status(201).json({ token, user: userToReturn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Vérification des champs requis
  if (!email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Supprimer le mot de passe avant de renvoyer les données utilisateur
    const userToReturn = { ...user.toJSON() };
    delete userToReturn.password;

    res.status(200).json({ token, user: userToReturn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};
