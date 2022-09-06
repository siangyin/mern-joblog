import { ActionsType } from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
	// DISPLAY OR CLEAR ALERT
	if (action.type === ActionsType.DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: "Please provide all values!",
		};
	}

	if (action.type === ActionsType.CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}

	// LOGIN OR REGISTER USER OR LOGOUT
	if (action.type === ActionsType.SETUP_USER_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === ActionsType.SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			userLocation: action.payload.user.location,
			jobLocation: action.payload.user.location,
			showAlert: true,
			alertType: "success",
			alertText: action.payload.alertText,
		};
	}

	if (action.type === ActionsType.SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}

	if (action.type === ActionsType.LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			jobLocation: "",
			userLocation: "",
		};
	}

	// UPDATE USER PROFILE
	if (action.type === ActionsType.UPDATE_USER_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === ActionsType.UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			showAlert: true,
			alertType: "success",
			alertText: "User Profile Updated!",
		};
	}
	if (action.type === ActionsType.UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}

	// TOGGLESIDEBBAR
	if (action.type === ActionsType.TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		};
	}

	// HANDLE FORM VALUE UPDATE STATE
	if (action.type === ActionsType.HANDLE_CHANGE) {
		return {
			...state,
			// page: 1,
			[action.payload.name]: action.payload.value,
		};
	}

	// CLEAR JOBFORM
	if (action.type === ActionsType.CLEAR_VALUES) {
		const initialState = {
			isEditing: false,
			editJobId: "",
			position: "",
			company: "",
			jobLocation: state.userLocation,
			jobType: "full-time",
			status: "pending",
		};

		return {
			...state,
			...initialState,
		};
	}

	// CREATE NEW JOB
	if (action.type === ActionsType.CREATE_JOB_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === ActionsType.CREATE_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "New Job Created!",
		};
	}

	if (action.type === ActionsType.CREATE_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}

	// GET JOBS
	if (action.type === ActionsType.GET_JOBS_BEGIN) {
		return { ...state, isLoading: true, showAlert: false };
	}

	if (action.type === ActionsType.GET_JOBS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			jobs: action.payload.jobs,
			totalJobs: action.payload.totalJobs,
			numOfPages: action.payload.numOfPages,
		};
	}

	// EDIT JOB
	if (action.type === ActionsType.SET_EDIT_JOB) {
		const job = state.jobs.find((job) => job._id === action.payload.id);
		const { _id, position, company, jobLocation, jobType, status } = job;
		return {
			...state,
			isEditing: true,
			editJobId: _id,
			position,
			company,
			jobLocation,
			jobType,
			status,
		};
	}

	if (action.type === ActionsType.EDIT_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === ActionsType.EDIT_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "Job Updated!",
		};
	}
	if (action.type === ActionsType.EDIT_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg || "something went wrong",
		};
	}

	// DELETE JOB
	if (action.type === ActionsType.DELETE_JOB_BEGIN) {
		return { ...state, isLoading: true };
	}

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;
