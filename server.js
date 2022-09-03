import express from "express";
const app = express();

app.get("/", (req, res) => {
	res.send("hello");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server running on ${port}`);
});
