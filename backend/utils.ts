import { RequestHandler } from "express";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tokenHashValue = process.env.TOKEN_HASH ?? "testing";
const passwordHashValue = process.env.PASSWORD_HASH ?? "testing";
const database_user = process.env.POSTGRES_USER;
const database_name = process.env.POSTGRES_DB;
const database_password = process.env.POSTGRES_PASSWORD;
const database_url = process.env.POSTGRES_URL;

if (!database_user || !database_name || !database_password || !database_url) {
  throw new Error("ERROR: Database Credentials are incomplete");
}
const sequelize = new Sequelize(
  database_name,
  database_user,
  database_password,
  {
    host: database_url,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
      },
      // dataString: true,
    },
  },
);

const tokenChecker = (token: string) => {
  try {
    jwt.verify(token, tokenHashValue);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const tokenDecoder = (token: string) => {
  try {
    return jwt.verify(token, tokenHashValue) as {
      email: string;
      userid: string;
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

const tokenEncoder = (data: { email: string; userid: string }) => {
  try {
    return jwt.sign(
      {
        email: data.email,
        userid: data.userid,
      },
      tokenHashValue,
      {
        expiresIn: "3d",
        algorithm: "HS256",
      },
    );
  } catch (error) {
    console.error(error);
    return;
  }
};
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: false,
      alter: false,
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

const hashPassword = (value: string) => {
  try {
    return bcrypt.hashSync(value, parseInt(passwordHashValue));
  } catch (error) {
    console.error(error);
  }
};
const checkPassword = (value: string, encryptedValue: string) => {
  try {
    return bcrypt.compareSync(value, encryptedValue);
  } catch (error) {
    console.error(error);
  }
};
export {
  connectDB,
  sequelize,
  tokenChecker,
  tokenDecoder,
  tokenEncoder,
  hashPassword,
  checkPassword,
};
