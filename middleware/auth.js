// UnAuthenticatedError;
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
	console.log(authHeader);
	next();
};

export default authUser;
