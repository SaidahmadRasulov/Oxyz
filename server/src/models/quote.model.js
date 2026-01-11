import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Quote = sequelize.define("quote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  where: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliver_item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight_item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delivery_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
