import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";
import limiter from "./config/rateLimit.config.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandler.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (_req, res) => {
  // res.send({ message: "Hello iam your Personal assistant" });
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use("/api/v1", router);

app.use(ErrorHandlerMiddleware);

app.get("*", (_req, res) =>
  res.status(404).send(`<h1> 404 Page Not Found !</h1>`)
);

export default app;
