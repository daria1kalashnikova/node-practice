import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./routes/api/productsRouter.js";
import { connectToDB } from "./db/Sequelize.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(json());

app.use("/api/products", productsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

connectToDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on the port 3000");
    });
  })
  .catch((error) => {
    console.error(`Error connection to database: ${error}`);
    process.exit(1);
  });
