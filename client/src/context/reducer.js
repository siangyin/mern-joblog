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

	// TOGGLESIDEBBAR
	if (action.type === ActionsType.TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !state.showSidebar,
		};
	}

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;
