import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.get("/", (req, res) => {
	res.send("hello");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server running on ${port}`);
});
