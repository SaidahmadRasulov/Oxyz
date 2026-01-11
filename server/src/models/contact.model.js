import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Contact = sequelize.define("contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  work_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number_main: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number_second: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
