import { Outlet, Link } from "react-router-dom";

import Wrapper from "../../assets/style/SharedLayout";
// import { Navbar, BigSidebar, SmallSidebar } from "../../components";

const SharedLayout = () => {
	return (
		<Wrapper>
			<nav>
				<Link to="add-job">add job</Link>
				<Link to="all-jobs">all job</Link>
			</nav>
			<Outlet />
		</Wrapper>
	);
};
export default SharedLayout;
