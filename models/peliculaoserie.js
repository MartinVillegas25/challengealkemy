'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peliculaoserie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  peliculaoserie.init({
    imagen: DataTypes.BLOB,
    titulo: DataTypes.STRING,
    fechacreacion: DataTypes.DATE,
    clasificacion: DataTypes.TINYINT,
    personajesasociados: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'peliculaoserie',
  });
  return peliculaoserie;
};