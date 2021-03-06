module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    topic: DataTypes.STRING
  });
  Topic.associate = function(models) {
    Topic.hasMany(models.Question, {
      onDelete: "cascade"
    });
    Topic.belongsTo(models.Subject, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Topic;
};
