'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Topic.belongsToMany(models.Entry, {
        through: 'EntriesTopics'
      })
    }
  };
  Topic.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    label: DataTypes.STRING,
    description: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Topic'
  })
  return Topic
}
