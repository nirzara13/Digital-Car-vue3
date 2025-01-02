// routes/procedures.js
import express from "express";
import {
  getBrands,
  getModels,
  getAdasComponents,
} from "../controllers/proceduresController.js";

const router = express.Router();

// Route pour récupérer toutes les marques
router.get("/brands", getBrands);

// Route pour récupérer les modèles en fonction de la marque
router.get("/models/:brand", getModels);

// Route pour récupérer les composants ADAS en fonction de la marque et du modèle
router.get("/adas-components/:brand/:model", getAdasComponents);

export default router;
