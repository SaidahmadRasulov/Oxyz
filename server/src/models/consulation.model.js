import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Consulation = sequelize.define("consulation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
      isAlphanumeric: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
