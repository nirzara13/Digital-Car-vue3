// models/brand.js
module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Brand.associate = function(models) {
      Brand.hasMany(models.Model);
    };
  
    return Brand;
  };
  