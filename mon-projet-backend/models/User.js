// // models/User.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/sequelize.js';  // Importer la connexion Sequelize

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,  // Assurer l'unicité du nom d'utilisateur
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,  // Assurer l'unicité de l'email
//     validate: {
//       isEmail: true,  // Validation pour s'assurer que l'email est au format correct
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// }, {
//   timestamps: true,  // Ajouter les timestamps (createdAt, updatedAt)
// });

// export default User;

// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Assure-toi que le nom de la table est correct
});

export default User;


