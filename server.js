// import cors from "cors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

// to build frontend application 1/3 (only when ready to deploy)
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// db & authenticateUser
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authUser from "./middleware/auth.js";

// morgan for dev environment only
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
// 	res.json({ msg: "hello" });
// });

const __dirname = dirname(fileURLToPath(import.meta.url));
// to build frontend application 2/3 (only when ready to deploy)
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUser, jobsRouter);

// to build frontend application 3/3 (only when ready to deploy)
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
