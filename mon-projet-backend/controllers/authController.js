// controllers/authController.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Définissez une variable d'environnement pour la clé secrète
const JWT_SECRET = process.env.JWT_SECRET || "Hola123";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification du mot de passe
    if (
      password.length < 12 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Le mot de passe doit être au moins de 10 caractères, contenir une majuscule, une minuscule, deux chiffres et deux caractères spéciaux",
      });
    }

    // Création de l'utilisateur
    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token, redirect: "/dashboard" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
