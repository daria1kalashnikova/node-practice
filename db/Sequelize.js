import { Sequelize } from "sequelize";
import { envConfig } from "../envConfig.js";

export const sequelize = new Sequelize({
  dialect: envConfig.DATABASE_DIALECT,
  username: envConfig.DATABASE_USERNAME,
  password: envConfig.DATABASE_PASSWORD,
  host: envConfig.DATABASE_HOST,
  database: envConfig.DATABASE_NAME,
  port: envConfig.DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error(`Error connection to database: ${error}`);
  }
};
