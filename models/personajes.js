'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personajes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Personajes.init({
    imagen: DataTypes.BLOB,
    nombre: DataTypes.STRING,
    edad: DataTypes.TINYINT,
    peso: DataTypes.TINYINT,
    historia: DataTypes.STRING,
    peliculasoserieasociada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personajes',
  });
  return Personajes;
};