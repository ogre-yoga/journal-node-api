'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Entry.belongsToMany(models.Topic, {
        through: 'EntriesTopics'
      })
    }
  };
  Entry.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['draft', 'private', 'public'],
      defaultValue: 'draft'
    },
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Entry'
  })
  return Entry
}
