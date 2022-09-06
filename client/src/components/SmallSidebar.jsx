import { FaTimes } from "react-icons/fa";

import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/style/SmallSidebar";
import { Logo, NavLinks } from ".";

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext();
	return (
		<Wrapper>
			<div
				className={
					showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
				}
			>
				<div className="content">
					<button type="button" className="close-btn" onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggleSidebar} />
				</div>
			</div>
		</Wrapper>
	);
};

export default SmallSidebar;
