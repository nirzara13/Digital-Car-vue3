



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
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import sequelize from './config/sequelize.js';
import authRoutes from './routes/authRoutes.js';
import proceduresRoutes from './routes/proceduresRoutes.js';
import uploadsRoutes from './routes/uploadsRoutes.js';  // Import des routes de fichier
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Obtenir le répertoire de travail actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: 'http://localhost:5173', // URL de votre frontend Vue
  credentials: true
}));

app.use(express.json()); // Middleware pour analyser les requêtes JSON

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // false si en développement
    httpOnly: true,
    maxAge: 3600000 // 1 heure
  }
}));

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/procedures', proceduresRoutes);
app.use('/api/uploads', uploadsRoutes);  // Utilisation des routes de fichiers


// Définir le répertoire statique pour les fichiers PDF
app.use('/uploads/pdf', express.static(path.join(__dirname, 'uploads', 'pdf')));

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
    app.listen(3000, () => {
      console.log('Serveur démarré sur http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
  });
