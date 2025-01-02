// models/File.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const File = sequelize.define('File', {
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  }
});

export default File;
