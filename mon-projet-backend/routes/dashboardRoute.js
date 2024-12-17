const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ msg: 'Bienvenue sur votre tableau de bord' });
});

module.exports = router;
