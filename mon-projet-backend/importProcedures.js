import pkg from 'pg';
import fs from 'fs/promises';
import dotenv from 'dotenv';

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
    const data = await fs.readFile('./data/procedures.json', 'utf8');
    const procedures = JSON.parse(data);

    console.log(`${procedures.length} procédures trouvées dans le fichier.`);

    for (const procedure of procedures) {
      const { marque, modele, composant_adas, procedure_doc } = procedure;

      // Insérer uniquement les colonnes existantes
      const query = `
        INSERT INTO procedures (marque, modele, composant_adas, procedure_doc)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [marque, modele, composant_adas, procedure_doc];

      await pool.query(query, values);
      console.log(`Procédure pour ${marque} ${modele} insérée avec succès.`);
    }
  } catch (err) {
    console.error('Erreur lors de l’importation :', err);
  } finally {
    pool.end(); // Ferme la connexion
  }
}

insertProcedures();
