module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    offerAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return Transaction;
};
