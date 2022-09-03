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

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;
