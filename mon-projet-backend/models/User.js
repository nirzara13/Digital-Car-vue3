const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('dcdb', 'user1', 'password123', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = User;
