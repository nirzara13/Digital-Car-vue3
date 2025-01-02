// routes/fileRoutes.js
const express = require('express');
const { addFile, deleteFile, updateFile } = require('../services/dataManager');
const multer = require('multer');
const router = express.Router();

// Configuration de multer pour gérer les fichiers téléchargés
const upload = multer({ dest: 'temp/' });

// Route pour ajouter un fichier
router.post('/upload', upload.single('file'), async (req, res) => {
    const { brand, model, component } = req.body;  // Récupérer les informations de la requête
    try {
        await addFile(brand, model, component, req.file);
        res.status(200).send('Fichier ajouté avec succès');
    } catch (err) {
        res.status(500).send('Erreur lors de l\'ajout du fichier');
    }
});

// Route pour supprimer un fichier
router.delete('/file/:id', async (req, res) => {
    const fileId = req.params.id;
    try {
        await deleteFile(fileId);
        res.status(200).send('Fichier supprimé avec succès');
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression du fichier');
    }
});

// Route pour mettre à jour un fichier
router.put('/file/:id', upload.single('file'), async (req, res) => {
    const fileId = req.params.id;
    try {
        await updateFile(fileId, req.file);
        res.status(200).send('Fichier mis à jour avec succès');
    } catch (err) {
        res.status(500).send('Erreur lors de la mise à jour du fichier');
    }
});

module.exports = router;
