import logo from "../assets/images/briefcase.png";

const Logo = () => {
	return (
		<header className="logo">
			<div style={{ display: "flex", alignItems: "baseline" }}>
				<img src={logo} alt="joblogo" height="30px" />
				<strong
					style={{
						fontSize: "30px",
						margin: "0 0 0px 10px",
						lineHeight: "1.3rem",
					}}
				>
					Jobbook
				</strong>
			</div>
		</header>
	);
};
export default Logo;
