import { Link } from "react-router-dom";

import img from "../assets/images/404.svg";
import Wrapper from "../assets/style/ErrorPage";

const Error = () => {
	return (
		<Wrapper className="full-page">
			<div>
				<img src={img} alt="not found" />
				<h3>Ohh! page not found</h3>
				<p>We can't seem to find the page you're looking for</p>
				<Link to="/" className="btn btn-hero">
					back home
				</Link>
			</div>
		</Wrapper>
	);
};
export default Error;
