import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

// import main ruta
import mainRouter from "./routes/main.router";
// import main ruta
import adminRouter from "./routes/admin.router";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// main route
app.use("/", mainRouter);
// admin routes
app.use("/admin", adminRouter);

export default app;