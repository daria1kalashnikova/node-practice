import express, { json } from "express";
import cors from "cors";
import productsRouter from "./routes/api/productsRouter";

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

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
