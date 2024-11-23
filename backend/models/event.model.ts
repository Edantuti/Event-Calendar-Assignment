import { sequelize } from "../utils";
import { DataTypes } from "sequelize";
import { User } from "./user.model";

export const Event = sequelize.define("event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  dateTime: {
    type: DataTypes.DATE,
  },
});

Event.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Event, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  hooks: true,
});
