// routes/proceduresRoutes.js
import express from 'express';
import { Procedure } from '../models/Procedure.js';  // Assure-toi que le chemin est correct

const router = express.Router();

// Route pour récupérer toutes les marques
router.get('/marques', async (req, res) => {
  try {
    const marques = await Procedure.findAll({
      attributes: ['marque'],
      group: ['marque'],
    });
    res.json(marques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des marques' });
  }
});

// Route pour récupérer les modèles d'une marque donnée
router.get('/modeles/:marque', async (req, res) => {
  const { marque } = req.params;
  try {
    const modeles = await Procedure.findAll({
      attributes: ['modele'],
      where: { marque },
      group: ['modele'],
    });
    res.json(modeles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des modèles' });
  }
});

// Route pour récupérer les composants ADAS pour un modèle et une marque donnés
router.get('/composants/:marque/:modele', async (req, res) => {
  const { marque, modele } = req.params;
  try {
    const composants = await Procedure.findAll({
      attributes: ['composant_adas'],
      where: { marque, modele },
      group: ['composant_adas'],
    });
    res.json(composants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des composants ADAS' });
  }
});

export default router;
