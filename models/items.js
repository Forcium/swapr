module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("item", {
    // Giving the Author model a name of type STRING
    content: DataTypes.TEXT
  });

  return Item;
};
