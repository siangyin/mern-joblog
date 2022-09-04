import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const authUser = async (req, res, next) => {
	// const header = req.headers;
	//{
	//   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE0MmMwZWFhYTBlMTdjYTQ1ZjdlOTIiLCJpYXQiOjE2NjIyNzczNzUsImV4cCI6MTY2MjM2Mzc3NX0.Gqv1ehkwi4YY-diiX5rTrneq6ncYDNGePpBCaulWaR4',
	//   'content-type': 'application/json',
	//   'user-agent': 'PostmanRuntime/7.29.2',
	//   accept: '*/*',
	//   'postman-token': 'ad668787-3526-49c1-91dc-719cf3e3c1c1',
	//   host: 'localhost:8080',
	//   'accept-encoding': 'gzip, deflate, br',
	//   connection: 'keep-alive',
	//   'content-length': '108'
	// }
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new UnAuthenticatedError("Authentication Invalid");
	}
	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// set req.user so when any other req from front end req will have prop user. accessable thru req.user.userId
		req.user = { userId: payload.userId };
		// console.log(payload);
		next();
	} catch (error) {
		throw new UnAuthenticatedError("Authentication Invalid");
	}
};

export default authUser;
