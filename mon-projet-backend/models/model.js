// models/model.js
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Model', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Model.associate = function(models) {
      Model.belongsTo(models.Brand);
      Model.hasMany(models.AdasComponent);
    };
  
    return Model;
  };
  