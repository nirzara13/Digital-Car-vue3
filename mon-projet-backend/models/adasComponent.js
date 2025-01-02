// models/AdasComponent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';  // Assurer que le chemin d'import est correct

const AdasComponent = sequelize.define('AdasComponent', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default AdasComponent;
