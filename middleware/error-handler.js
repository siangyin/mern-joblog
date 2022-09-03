// import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
	res.status(500).json({ msg: "got error" });
};

export default errorHandlerMiddleware;
