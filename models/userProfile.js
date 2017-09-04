module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "/assets/images/userStock.png"
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Profile.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Profile.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Profile;
};
