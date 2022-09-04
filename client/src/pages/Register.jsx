import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/style/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const Register = () => {
	const navigate = useNavigate();
	const { user, isLoading, showAlert, displayAlert, registerUser } =
		useAppContext();

	const [values, setValues] = useState(initialState);
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}
		const currUser = { name, email, password };
		if (isMember) {
			console.log("already member");
		} else {
			registerUser(currUser);
		}
	};

	// const getDb = async () => {
	// 	try {
	// 		const res = await fetch("/api/v1/jobs");
	// 		const data = await res.json();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		if (user) {
			// navigate("/");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"}</h3>

				{showAlert && <Alert />}
				{/* name input */}
				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
					/>
				)}

				{/* email input */}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
				/>

				<button type="submit" className="btn btn-block" disabled={isLoading}>
					submit
				</button>

				<p>
					{values.isMember ? "Not a member yet?" : "Already a member?"}
					<button type="button" onClick={toggleMember} className="member-btn">
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
