// routes/procedures.js
import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Route pour récupérer toutes les marques
router.get('/marques', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT marque FROM procedures');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des marques:', error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer les modèles en fonction de la marque
router.get('/modeles/:marque', async (req, res) => {
  const { marque } = req.params;
  try {
    const result = await pool.query('SELECT DISTINCT modele FROM procedures WHERE marque = $1', [marque]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles:', error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer les composants ADAS en fonction de la marque et du modèle
router.get('/composants/:marque/:modele', async (req, res) => {
  const { marque, modele } = req.params;
  try {
    const result = await pool.query(
      'SELECT DISTINCT composant_adas FROM procedures WHERE marque = $1 AND modele = $2',
      [marque, modele]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des composants ADAS:', error);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
