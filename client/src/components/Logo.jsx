import logo from "../assets/images/briefcase.png";

const Logo = () => {
	return (
		<header className="logo">
			<div style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} alt="joblogo" height="40px" />
				<strong style={{ fontSize: "32px", margin: "0 10px" }}>
					Job Tracker
				</strong>
			</div>
		</header>
	);
};
export default Logo;
