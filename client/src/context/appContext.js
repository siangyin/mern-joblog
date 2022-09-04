import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { ActionsType } from "./actions";

const endPoint = {
	userRegister: "/api/v1/auth/register",
	userLogin: "/api/v1/auth/login",
	userUpdate: "/api/v1/auth/updateuser",
	jobs: "/api/v1/jobs",
	jobsStats: "/api/v1/jobs/stats",
	jobsId: "/api/v1/jobs/{id}",
};

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: null,
	token: null,
	userLocation: "",
	jobLocation: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const displayAlert = () => {
		dispatch({ type: ActionsType.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: ActionsType.CLEAR_ALERT });
		}, 3000);
	};

	const registerUser = async (currUser) => {
		dispatch({ type: ActionsType.SETUP_USER_BEGIN });

		try {
			const response = await axios.post(endPoint.userRegister, currUser);
			console.log(response);
			dispatch({
				type: ActionsType.SETUP_USER_SUCCESS,
				payload: { user: response.data.user, token: response.data.token },
			});
		} catch (error) {
			dispatch({
				type: ActionsType.SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
			}}
		>
			{children}{" "}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
