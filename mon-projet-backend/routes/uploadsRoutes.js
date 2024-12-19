// routes/uploadsRoutes.js
import express from 'express';
import multer from 'multer'; // Pour gérer les fichiers
import path from 'path';
import fs from 'fs';
import { Procedure } from '../models/Procedure.js'; // Assure-toi d'importer ton modèle Sequelize

const router = express.Router();

// Configuration de Multer pour l'upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/pdf'; // Répertoire où les PDF seront stockés
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crée le dossier si nécessaire
    }
    cb(null, uploadDir); // Stockage dans le dossier 'uploads/pdf'
  },
  filename: (req, file, cb) => {
    // Récupère la marque, le modèle et le composant dans le corps de la requête
    const { marque, modele, composant } = req.body;
    // Crée le nom du fichier avec la structure souhaitée
    const filename = `${marque}_${modele}_${composant}.pdf`;
    cb(null, filename); // Assigne ce nom de fichier
  },
});

const upload = multer({ storage });

// Route pour uploader un fichier
router.post('/upload', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: 'Aucun fichier envoyé.' });
  }

  // Récupère les informations de la requête pour la base de données
  const { marque, modele, composant } = req.body;

  // Vérification si la procédure existe déjà dans la base de données
  Procedure.findOne({
    where: { marque, modele, composant_adas: composant }
  })
    .then((procedure) => {
      if (!procedure) {
        // Si la procédure n'existe pas, renvoyer une erreur
        return res.status(404).json({ message: 'Procédure non trouvée.' });
      }

      // Si la procédure existe, on met à jour le champ pdf_existe
      return Procedure.update(
        { pdf_existe: true },
        { where: { marque, modele, composant_adas: composant } }
      );
    })
    .then(() => {
      // Après l'update, renvoyer une réponse de succès
      res.status(200).json({
        message: 'Fichier uploadé avec succès.',
        filePath: uploadedFile.path,
      });
    })
    .catch((err) => {
      console.error('Erreur lors de la mise à jour de pdf_existe:', err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la base de données.' });
    });
});

// Route pour récupérer un PDF spécifique par marque, modèle et composant
router.get('/pdf-exist/:marque/:modele/:composant', async (req, res) => {
  const { marque, modele, composant } = req.params;

  try {
    // Vérifie si la procédure existe et si pdf_existe est TRUE
    const procedure = await Procedure.findOne({
      where: { marque, modele, composant_adas: composant, pdf_existe: true },
    });

    if (!procedure) {
      return res.status(404).json({ message: 'Fichier PDF non disponible.' });
    }

    // Chemin attendu du fichier PDF
    const pdfPath = path.join('uploads/pdf', `${marque}_${modele}_${composant}.pdf`);

    // Vérifie si le fichier existe
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'Fichier PDF introuvable.' });
    }

    // Retourne une réponse indiquant que le PDF existe
    res.status(200).json({ pdf_exist: true, pdfPath });
  } catch (err) {
    console.error('Erreur lors de la récupération du PDF:', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

router.post('/upload-pdf', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: 'Aucun fichier envoyé.' });
  }

  // Récupère les informations de la requête pour la base de données
  const { marque, modele, composant } = req.body;

  // Vérification si la procédure existe déjà dans la base de données
  Procedure.findOne({
    where: { marque, modele, composant_adas: composant }
  })
    .then((procedure) => {
      if (!procedure) {
        return res.status(404).json({ message: 'Procédure non trouvée.' });
      }

      // Si la procédure existe, on met à jour le champ pdf_existe
      return Procedure.update(
        { pdf_existe: true },
        { where: { marque, modele, composant_adas: composant } }
      );
    })
    .then(() => {
      // Après l'update, renvoyer une réponse de succès
      res.status(200).json({
        message: 'Fichier uploadé avec succès.',
        filePath: uploadedFile.path,
      });
    })
    .catch((err) => {
      console.error('Erreur lors de la mise à jour de pdf_existe:', err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la base de données.' });
    });
});


// Route pour convertir un fichier en PDF
router.post('/convert', (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ message: 'Chemin du fichier manquant.' });
  }

  // Crée le chemin du fichier PDF à partir du chemin initial
  const pdfPath = filePath.replace(path.extname(filePath), '.pdf');

  // Chemin vers l'exécutable LibreOffice (vérifier que ce chemin est correct)
  const libreOfficePath = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe';

  // Vérification si le fichier existe
  if (!fs.existsSync(libreOfficePath)) {
    return res.status(500).json({ message: `LibreOffice n'est pas installé ou le chemin est incorrect : ${libreOfficePath}` });
  }

  // Utilisation de spawn pour exécuter LibreOffice de manière asynchrone
  const libreOfficeProcess = spawn(libreOfficePath, ['--headless', '--convert-to', 'pdf', filePath, '--outdir', path.dirname(filePath)]);

  libreOfficeProcess.on('error', (err) => {
    console.error('Erreur de processus:', err);
    return res.status(500).json({ message: 'Erreur lors de la conversion du fichier.', error: err });
  });

  libreOfficeProcess.on('exit', async (code, signal) => {
    if (code === 0) {
      // Récupérer les informations nécessaires pour la mise à jour de la base de données
      const procedureId = path.basename(filePath, path.extname(filePath)); // Exemple : "Toyota_Corolla_Radar"
      
      try {
        // Mise à jour de la colonne pdf_existe à true pour cette procédure
        await Procedure.update(
          { pdf_existe: true },
          { where: { marque: 'Toyota', modele: 'Corolla', composant_adas: 'Radar avant' } } // Adapté aux valeurs dynamiques si nécessaire
        );
        
        // Retourner une réponse avec le chemin du PDF
        res.status(200).json({
          message: 'Fichier converti en PDF avec succès.',
          pdfPath,
        });
      } catch (err) {
        console.error('Erreur lors de la mise à jour de pdf_existe:', err);
        return res.status(500).json({
          message: 'PDF converti, mais mise à jour de la base de données échouée.',
        });
      }
    } else {
      console.error('Erreur lors de la conversion', signal);
      return res.status(500).json({
        message: 'Erreur lors de la conversion du fichier.',
        code,
        signal,
      });
    }
  });
});

export default router;
