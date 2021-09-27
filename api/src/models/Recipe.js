const {Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.INTEGER,
    }, 

    spoonacularScore: {
      type: DataTypes.INTEGER
    },

    steps: {
      type: DataTypes.TEXT,
    }
  });

  sequelize.define('dietType', {
    ID: {
      type: DataTypes.INTEGER
    },

    name: {
      type: DataTypes.STRING
    }
  })
};
