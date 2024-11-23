import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";

import { v1 } from "./routes/v1";
import { connectDB } from "./utils";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  morgan(
    `:remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`,
  ),
);
app.use("/api/v1", v1);
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log("Successfully Connected to the Database");
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(`Server is running on port ${PORT}`);
});
