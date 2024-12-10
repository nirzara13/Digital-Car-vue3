const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');  // Assure-toi que ce modèle est bien défini pour l'utilisateur

// Fonction pour envoyer l'e-mail de réinitialisation
const sendResetEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ton.email@gmail.com',
      pass: 'ton_mot_de_passe'
    }
  });

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: 'ton.email@gmail.com',
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé: ' + info.response);
    }
  });
};

// Route pour demander un lien de réinitialisation
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Utilisateur non trouvé.' });

    const resetToken = jwt.sign({ userId: user._id }, 'votre_clé_secrète', { expiresIn: '1h' });

    sendResetEmail(user.email, resetToken);

    res.status(200).json({ msg: 'Un email de réinitialisation a été envoyé.' });
  } catch (error) {
    res.status(500).json({ msg: 'Erreur du serveur, veuillez réessayer.' });
  }
};

// Route pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, 'votre_clé_secrète');
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé.' });

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    res.status(400).json({ msg: 'Token invalide ou expiré.' });
  }
};
