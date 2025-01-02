// backend/routes/adasRoutes.js
import express from 'express';
import path from 'path';
import File from '../models/File.js';

const router = express.Router();

// Route pour récupérer un fichier PDF en fonction de la marque, du modèle et du composant
router.get('/api/adas/pdf/:marque/:modele/:composant', async (req, res) => {
  const { marque, modele, composant } = req.params;

  try {
    // Chercher le fichier correspondant dans la base de données
    const file = await File.findOne({
      where: {
        marque,
        modele,
        composant_adas: composant,
      },
    });

    if (file) {
      // Générer le chemin du fichier PDF en fonction de la structure "files/{marque}/{modele}/{file_name}"
      const pdfPath = path.join(__dirname, 'files', marque, modele, file.file_name);

      // Vérifier si le fichier existe
      if (require('fs').existsSync(pdfPath)) {
        const pdfUrl = `/files/${marque}/${modele}/${file.file_name}`;
        return res.json({ pdfUrl });
      } else {
        return res.status(404).json({ error: 'Le fichier PDF n\'existe pas' });
      }
    } else {
      return res.status(404).json({ error: 'Aucun fichier trouvé pour ces critères' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier PDF:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
