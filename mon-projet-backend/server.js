import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import multer from "multer"; // Import pour gérer les fichiers
import path from "path";
import { spawn } from "child_process"; // Utilisé pour la conversion
import fs from "fs";
import sequelize from "./config/sequelize.js";
import authRoutes from "./routes/authRoutes.js";
import proceduresRoutes from "./routes/proceduresRoutes.js"; // Ajout des routes
import { isAuthenticated } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL de votre frontend Vue
    credentials: true,
  })
);

app.use(express.json()); // Middleware pour analyser les requêtes JSON

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

// Configuration de Multer pour l'upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Crée le dossier si nécessaire
    }
    cb(null, uploadDir); // Stockage dans le dossier 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
  },
});
const upload = multer({ storage });

// Route pour uploader un fichier
app.post("/api/upload", upload.single("file"), (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: "Aucun fichier envoyé." });
  }

  res.status(200).json({
    message: "Fichier uploadé avec succès.",
    filePath: uploadedFile.path,
  });
});

// Route pour convertir un fichier en PDF
app.post("/api/convert", (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ message: "Chemin du fichier manquant." });
  }

  const pdfPath = filePath.replace(path.extname(filePath), ".pdf");

  const libreOfficeProcess = spawn("libreoffice", [
    "--headless",
    "--convert-to",
    "pdf",
    filePath,
    "--outdir",
    path.dirname(filePath),
  ]);

  libreOfficeProcess.on("exit", (code) => {
    if (code === 0) {
      res.status(200).json({
        message: "Fichier converti en PDF avec succès.",
        pdfPath,
      });
    } else {
      res
        .status(500)
        .json({ message: "Erreur lors de la conversion du fichier." });
    }
  });
});

app.use((req, res, next) => {
  if (req.session.cookie.expires && new Date() > req.session.cookie.expires) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session :", err);
      } else {
        console.log("Session expirée. Déconnexion.");
      }
    });
  }
  next();
});

// Routes existantes
app.use("/api/auth", authRoutes);
app.use("/api/procedures", proceduresRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie");
    app.listen(3000, () => {
      console.log("Serveur démarré sur http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

app.get("/api/protected", isAuthenticated, (req, res) => {
  res.json({ message: "Route protégée accessible." });
});
