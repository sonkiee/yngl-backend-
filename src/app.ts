import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./routes/index.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import path from "path";

const app = express();

// const __filename = fileURLToPath(import.meta.url); // only needed in ESM
// const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
