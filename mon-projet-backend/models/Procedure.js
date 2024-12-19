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
  pdf_existe: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Par défaut, aucun PDF n'existe
  },
}, {
  tableName: 'procedures',
  timestamps: false,
});

export { Procedure };

