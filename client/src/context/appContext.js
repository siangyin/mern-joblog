import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { ActionsType } from "./actions";

const apiPath = {
	setupUser: "/api/v1/auth",
	userUpdate: "/auth/updateuser",
	jobs: "/jobs",
	jobsStats: "/jobs/stats",
	jobsId: "/jobs/{id}",
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	showSidebar: false,
	isEditing: false,
	editJobId: "",
	position: "",
	company: "",
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["interview", "declined", "pending"],
	status: "pending",
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// CUSTOM AXIOS SETUP
	const authFetch = axios.create({
		baseURL: "/api/v1",
	});

	// request
	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common["Authorization"] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// response
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				// console.log("auth error 401");
				logoutUser();
			}
			return Promise.reject(error);
		}
	);

	// DISPLAY OR CLEAR ALERT
	const displayAlert = () => {
		dispatch({ type: ActionsType.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: ActionsType.CLEAR_ALERT });
		}, 3000);
	};

	// ADD OR REMOVE LOCALSTORAGE
	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", user.location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("location");
	};

	// LOGIN OR REGISTER USER OR LOGOUT
	const setupUser = async ({ currUser, endPointReq, alertText }) => {
		dispatch({ type: ActionsType.SETUP_USER_BEGIN });

		try {
			const response = await axios.post(
				`${apiPath.setupUser}/${endPointReq}`,
				currUser
			);
			const { user, token } = response.data;
			dispatch({
				type: ActionsType.SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			});
			addUserToLocalStorage({ user, token });
		} catch (error) {
			dispatch({
				type: ActionsType.SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	// UPDATE USER PROFILE
	const updateUser = async (currUser) => {
		dispatch({ type: ActionsType.UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch(apiPath.userUpdate, currUser);
			const { user, location, token } = data;

			dispatch({
				type: ActionsType.UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			});
			addUserToLocalStorage({ user, token });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: ActionsType.UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		clearAlert();
	};

	const logoutUser = () => {
		dispatch({ type: ActionsType.LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	// TOGGLESIDEBBAR
	const toggleSidebar = () => {
		dispatch({ type: ActionsType.TOGGLE_SIDEBAR });
	};

	// form helper
	const handleChange = ({ name, value }) => {
		dispatch({ type: ActionsType.HANDLE_CHANGE, payload: { name, value } });
	};
	const clearValues = () => {
		dispatch({ type: ActionsType.CLEAR_VALUES });
	};

	// CREATE JOB
	const createJob = async () => {
		dispatch({ type: ActionsType.CREATE_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.post("/jobs", {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});
			dispatch({ type: ActionsType.CREATE_JOB_SUCCESS });
			dispatch({ type: ActionsType.CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: ActionsType.CREATE_JOB_ERROR,
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
				setupUser,
				logoutUser,
				toggleSidebar,
				updateUser,
				handleChange,
				clearValues,
				createJob,
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
