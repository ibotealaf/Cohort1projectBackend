import { databaseConfig } from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "./user.js";
// Create a Sequelize instance with the database configurations
const sequelize = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle,
    },
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the mysql database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Add our models
db.users = UserModel(sequelize, DataTypes);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table sync successfully");
  })
  .catch((err) => {
    console.log("Error occured while syncing the table", err);
  });

export default db;
