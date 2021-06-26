'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  genero.init({
    nombre: DataTypes.STRING,
    imagen: DataTypes.BLOB,
    Peliculaasociada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'genero',
  });
  return genero;
};