// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/dashboard', authMiddleware.verifyToken, (req, res) => {
//   res.status(200).json({ message: 'Welcome to your dashboard', userId: req.userId });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // si tu utilises un middleware d'authentification

// Route protégée pour le tableau de bord
router.get('/dashboard', authMiddleware, (req, res) => {
  const userId = req.user.id; // suppose que tu as un middleware qui ajoute `user` à la requête
  res.json({ userId });
});

module.exports = router;
