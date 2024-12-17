// models/Procedure.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';  // Assure-toi que tu as la bonne importation du fichier de configuration

const Procedure = sequelize.define('Procedure', {
  marque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modele: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  composant_adas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Ajoute d'autres champs nécessaires pour ta table
}, {
  tableName: 'procedures',  // Nom de la table dans ta base de données
  timestamps: false,  // Si tu n'as pas de colonnes 'createdAt' et 'updatedAt'
});

export { Procedure };
