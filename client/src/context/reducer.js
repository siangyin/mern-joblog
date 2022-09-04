import { ActionsType } from "./actions";

const reducer = (state, action) => {
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
			alertText: "User created! redirecting...",
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

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;
