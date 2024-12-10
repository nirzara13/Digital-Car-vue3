// require('dotenv').config();

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
// const dashboardRoutes = require('./routes/dashboardRoute');

// // Middleware
// app.use(bodyParser.json());

// // Route par défaut pour la racine
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur l\'API !');
// });

// // Routes pour l'authentification et le dashboard
// app.use('/api/auth', authRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Lancer le serveur
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import des routes
const authRoutes = require('./routes/authRoutes'); // Route pour l'authentification
const dashboardRoute = require('./routes/dashboardRoute'); // Route pour le tableau de bord

const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes Cross-Origin
app.use(bodyParser.json()); // Parser les requêtes en JSON

// Routes
app.use('/api/auth', authRoutes); // Routes liées à l'authentification
app.use('/api', dashboardRoute); // Routes liées au tableau de bord

// Route par défaut (facultative)
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Backend !');
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
