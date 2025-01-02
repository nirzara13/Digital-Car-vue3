// routes/proceduresRoutes.js
import express from "express";
import { Procedure } from "../models/Procedure.js"; // Assure-toi que le chemin est correct

const router = express.Router();

// Route pour récupérer toutes les marques (brands)
router.get("/brands", async (req, res) => {
  try {
    const brands = await Procedure.findAll({
      attributes: ["brand"], // Changer "marque" en "brand"
      group: ["brand"], // Changer "marque" en "brand"
    });
    res.json(brands);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des marques" });
  }
});

// Route pour récupérer les modèles d'une marque donnée (model)
router.get("/models/:brand", async (req, res) => {
  const { brand } = req.params; // Changer "marque" en "brand"
  try {
    const models = await Procedure.findAll({
      attributes: ["model"], // Changer "modele" en "model"
      where: { brand }, // Changer "marque" en "brand"
      group: ["model"], // Changer "modele" en "model"
    });
    res.json(models);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des modèles" });
  }
});

// Route pour récupérer les composants ADAS pour un modèle et une marque donnés (adas_components)
router.get("/adas-components/:brand/:model", async (req, res) => {
  const { brand, model } = req.params;
  try {
    const adasComponents = await Procedure.findAll({
      attributes: ["adas_component"], // Changer "composant_adas" en "adas_component"
      where: { brand, model },
      group: ["adas_component"], // Changer "composant_adas" en "adas_component"
    });
    res.json(adasComponents);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des composants ADAS" });
  }
});

export default router;
