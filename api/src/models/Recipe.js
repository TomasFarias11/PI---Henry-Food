const {Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,      //genera un id random, unico y especifico para no pisar con los id de la Api.
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }, 

    spoonacularScore: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    steps: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });

  sequelize.define('dietType', {
    name: {
      type: DataTypes.STRING
    }
  })
};
