'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class urls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  urls.init(
    {
      short_url: DataTypes.STRING,
      long_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Urls',
      tableName: 'urls',
    }
  );
  return urls;
};
