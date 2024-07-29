import express from "express";
import cors from "cors";
import dbConn from "../config/dbConn.mjs";
import credentials from "../middleware/credentials.mjs";
import corsOptions from "../config/corsOptions.mjs";
import { logger } from "../middleware/logEvents.mjs";
import cookieParser from "cookie-parser";
import rootRouter from "../routes/root.mjs";
import authRouter from "../routes/auth.mjs";
import registerRouter from "../routes/register.mjs";
import refreshTokenRouter from "../routes/refresh.mjs";
import logoutRouter from "../routes/logout.mjs";
import dotenv from "dotenv";
import usersRouter from "../routes/api/users.mjs";
import studentRouter from "../routes/api/students.mjs";
import verifyJWT from "../middleware/verifyJWT.mjs";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

dbConn();

const corsOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : process.env.DEV_URL;

app.use(
  cors({
    origin: [corsOrigin],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(logger);
app.use(cookieParser());
app.use("/api", rootRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/users", usersRouter);
app.use("/students", studentRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
