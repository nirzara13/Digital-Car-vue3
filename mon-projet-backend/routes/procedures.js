// routes/procedures.js
import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import multer from 'multer';

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

// Route pour vérifier si un PDF existe pour une procédure donnée
router.get('/pdf-exist/:marque/:modele/:composant', async (req, res) => {
  const { marque, modele, composant } = req.params;
  try {
    const result = await pool.query(
      'SELECT pdf_existe FROM procedures WHERE marque = $1 AND modele = $2 AND composant_adas = $3',
      [marque, modele, composant]
    );
    if (result.rows.length > 0) {
      const pdfExist = result.rows[0].pdf_existe; // On renvoie si le PDF existe
      res.json({ pdf_exist: pdfExist });
    } else {
      res.status(404).json({ error: 'Procédure non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du PDF:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Configuration de multer pour l'upload des fichiers PDF
const upload = multer({ dest: 'uploads/pdf/' }); // Le dossier où les PDF seront stockés

// Route pour uploader un PDF
router.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
  const { marque, modele, composant } = req.body;
  const filePath = `/uploads/pdf/${req.file.filename}`; // Chemin vers le fichier uploadé

  try {
    // Mettre à jour la base de données pour indiquer que le PDF existe
    await pool.query(
      'UPDATE procedures SET pdf_existe = $1, procedure_doc = $2 WHERE marque = $3 AND modele = $4 AND composant_adas = $5',
      [true, filePath, marque, modele, composant]
    );
    res.json({ success: true, message: 'PDF téléchargé et enregistré' });
  } catch (error) {
    console.error('Erreur lors de l\'upload du PDF:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


export default router;
