import { Pool } from "pg";

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Récupérer toutes les marques
export const getBrands = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT name AS brand FROM brands"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Récupérer les modèles en fonction d'une marque
export const getModels = async (req, res) => {
  const { brand } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT DISTINCT models.name AS model 
      FROM models 
      JOIN brands ON models.brand_id = brands.id 
      WHERE brands.name = $1
      `,
      [brand]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Récupérer les composants ADAS en fonction de la marque et du modèle
export const getAdasComponents = async (req, res) => {
  const { brand, model } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT DISTINCT adas_components.name AS adas_component 
      FROM adas_components 
      JOIN models ON adas_components.model_id = models.id 
      JOIN brands ON models.brand_id = brands.id 
      WHERE brands.name = $1 AND models.name = $2
      `,
      [brand, model]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching ADAS components:", error);
    res.status(500).json({ error: "Server error" });
  }
};
