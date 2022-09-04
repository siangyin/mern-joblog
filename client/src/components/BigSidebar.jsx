import { useAppContext } from "../context/appContext";
// import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/style/BigSidebar";

const BigSidebar = () => {
	// const { showSidebar } = useAppContext();
	return (
		<Wrapper>
			<div>
				<div className="content">
					<header>
						<Logo />
					</header>
				</div>
			</div>
		</Wrapper>
	);
};

export default BigSidebar;
