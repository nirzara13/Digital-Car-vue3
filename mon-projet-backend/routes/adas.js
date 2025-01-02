// routes/adas.js
const express = require('express');
const { Brand, Model, AdasComponent } = require('../models');
const router = express.Router();

router.get('/pdf', async (req, res) => {
  const { brand, model, component } = req.query;

  try {
    const adasComponent = await AdasComponent.findOne({
      include: {
        model: Model,
        where: { name: model },
        include: {
          model: Brand,
          where: { name: brand }
        }
      },
      where: { name: component }
    });

    if (adasComponent) {
      res.json({ file_path: adasComponent.file_path });
    } else {
      res.status(404).send('Composant ADAS non trouvé');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération du PDF');
  }
});

module.exports = router;
