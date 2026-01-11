import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import dotenv from "dotenv";
import globalRouter from "./router/index.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api", globalRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync({ force: false });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
