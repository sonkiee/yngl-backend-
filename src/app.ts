import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./routes/index.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
