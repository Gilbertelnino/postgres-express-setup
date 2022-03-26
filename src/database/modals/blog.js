const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // one-to-many
      Blog.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
        as: "createBy",
      });
    }
  }

  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "blogs",
    }
  );

  return Blog;
};
