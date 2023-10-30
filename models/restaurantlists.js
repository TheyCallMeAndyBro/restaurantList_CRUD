'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurantList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      restaurantList.belongsTo(models.Users) //預設會把fk設置為Users加上Id
    }
  }
  restaurantList.init({
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    google_map: DataTypes.STRING,
    rating: DataTypes.STRING,
    description: DataTypes.STRING,
    usersId:{
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'restaurantLists',
  });
  return restaurantList;
};