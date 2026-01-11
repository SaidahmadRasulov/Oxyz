import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Stats = sequelize.define("stats", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
