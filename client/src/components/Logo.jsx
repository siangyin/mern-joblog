import logo from "../assets/images/briefcase.png";

const Logo = () => {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<img src={logo} alt="joblogo" className="logo" height="40px" />
			<strong style={{ fontSize: "32px", margin: "30px 10px" }}>
				Job Tracker
			</strong>
		</div>
	);
};
export default Logo;
