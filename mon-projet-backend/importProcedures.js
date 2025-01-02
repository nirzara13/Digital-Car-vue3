import pkg from "pg";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Configuration de la base de données
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function insertProcedures() {
  try {
    const data = await fs.readFile("./data/procedures.json", "utf8");
    const procedures = JSON.parse(data);

    console.log(`${procedures.length} procédures trouvées dans le fichier.`);

    for (const procedure of procedures) {
      const { brands, models, adas_components, procedure_doc } = procedure;

      // 1. Insérer ou récupérer l'ID de la marque
      const brandResult = await pool.query(
        `INSERT INTO brands (malibelle) VALUES ($1) ON CONFLICT (malibelle) DO NOTHING RETURNING id`,
        [brands]
      );
      const brandId =
        brandResult.rows[0]?.id ||
        (
          await pool.query("SELECT id FROM brands WHERE malibelle = $1", [
            brands,
          ])
        ).rows[0].id;

      // 2. Insérer ou récupérer l'ID du modèle
      const modelResult = await pool.query(
        `INSERT INTO models (molibelle, idmarque) VALUES ($1, $2) ON CONFLICT (molibelle) DO NOTHING RETURNING id`,
        [models, brandId]
      );
      const modelId =
        modelResult.rows[0]?.id ||
        (
          await pool.query("SELECT id FROM models WHERE molibelle = $1", [
            models,
          ])
        ).rows[0].id;

      // 3. Insérer ou récupérer l'ID du composant ADAS
      const adasResult = await pool.query(
        `INSERT INTO adas_components (colibelle, idmodele) VALUES ($1, $2) ON CONFLICT (colibelle) DO NOTHING RETURNING id`,
        [adas_components, modelId]
      );
      const adasId =
        adasResult.rows[0]?.id ||
        (
          await pool.query(
            "SELECT id FROM adas_components WHERE colibelle = $1",
            [adas_components]
          )
        ).rows[0].id;

      // 4. Optionnel: Insérer la procédure dans une table distincte si nécessaire
      // Si vous avez une table 'procedures' pour enregistrer les procédures liées à l'ADAS, vous pouvez l'ajouter ici.

      console.log(
        `Procédure pour ${brands} ${models} (${adas_components}) insérée avec succès.`
      );
    }
  } catch (err) {
    console.error("Erreur lors de l’importation :", err);
  } finally {
    pool.end(); // Ferme la connexion
  }
}

insertProcedures();
