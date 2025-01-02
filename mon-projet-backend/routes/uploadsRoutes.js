import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { addFile } from '../services/dataManager.js';  // Import du DataManager pour l'ajout des fichiers

const router = express.Router();

// Configuration de multer pour l'upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './temp');  // Dossier temporaire pour stocker les fichiers avant de les déplacer
    },
    filename: (req, file, cb) => {
        const { brand, model, component } = req.body;
        const fileName = `${component}_${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

// Route pour ajouter un fichier
router.post('/add', upload.single('file'), async (req, res) => {
    const { brand, model, component } = req.body;
    const file = req.file;

    if (!brand || !model || !component || !file) {
        return res.status(400).json({ message: 'Tous les champs sont nécessaires.' });
    }

    try {
        await addFile(brand, model, component, file);
        res.status(200).json({ message: 'Fichier ajouté avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du fichier.', error: error.message });
    }
});

export default router;
