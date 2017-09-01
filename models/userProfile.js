module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [6]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "../public/assets/images/placeholder.png"
    },
  });
  return Profile;
};
