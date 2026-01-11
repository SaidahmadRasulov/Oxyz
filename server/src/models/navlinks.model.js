import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const NavbarLinks = sequelize.define("nav_links", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

