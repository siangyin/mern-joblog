import { useState } from "react";
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
	const [values, setValues] = useState(initialState);
	const { isLoading, showAlert, displayAlert } = useAppContext();
	// console.log(state);
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		console.log(e.target.name, e.target.value);
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}
		console.log(values);
	};

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
