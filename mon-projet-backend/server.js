



// import express from 'express';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import cors from 'cors';
// import sequelize from './config/sequelize.js';
// import authRoutes from './routes/authRoutes.js';
// import proceduresRoutes from './routes/proceduresRoutes.js';  // Ajout des routes

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173', // URL de votre frontend Vue
//   credentials: true
// }));

// app.use(express.json()); // Middleware pour analyser les requêtes JSON

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // false si en développement
//     httpOnly: true,
//     maxAge: 3600000 // 1 heure
//   }
// }));

// app.use('/api/auth', authRoutes);
// app.use('/api/procedures', proceduresRoutes);  // Utilisation des routes

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connexion à la base de données réussie');
//     app.listen(3000, () => {
//       console.log('Serveur démarré sur http://localhost:3000');
//     });
//   })
//   .catch((err) => {
//     console.error('Impossible de se connecter à la base de données :', err);
//   });


// server.js

// server.js

import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const app = express();

// Obtenir le répertoire de travail actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurer le CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // URL de ton frontend
    credentials: true,
  })
);

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // false si en développement
      httpOnly: true,
      maxAge: 3600000, // 1 heure
    },
  })
);

// Route pour récupérer les fichiers selon marque, modèle et composant
app.get('/api/files/:marque/:modele/:composant', async (req, res) => {
  const { marque, modele, composant } = req.params;
  const directoryPath = path.join(__dirname, 'files', marque, modele);

  console.log("Requête reçue avec les paramètres :");
  console.log("Marque :", marque);
  console.log("Modèle :", modele);
  console.log("Composant :", composant);
  console.log("Chemin du dossier recherché :", directoryPath);

  try {
    // Vérifie si le dossier existe
    if (!fs.existsSync(directoryPath)) {
      console.log("Dossier non trouvé :", directoryPath);
      return res.status(404).json({ message: 'Aucun fichier trouvé pour cette combinaison.' });
    }

    // Lit les fichiers dans le dossier et filtre par composant
    const files = fs.readdirSync(directoryPath)
      .filter(file => file.toLowerCase().includes(composant.toLowerCase())) // Filtrer par composant
      .map(file => ({
        file_name: file,
        file_url: `http://localhost:3000/files/${marque}/${modele}/${file}`,
      }));

    console.log("Fichiers trouvés :", files);

    if (files.length === 0) {
      return res.status(404).json({ message: 'Aucun fichier correspondant trouvé.' });
    }

    res.status(200).json({ files });
  } catch (error) {
    console.error('Erreur lors de la lecture des fichiers :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Définir les fichiers comme ressources statiques pour les servir
app.use('/files', express.static(path.join(__dirname, 'files')));

// Connexion au serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
