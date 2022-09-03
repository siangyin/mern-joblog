import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import { ActionsType } from "./actions";

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
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

	return (
		<AppContext.Provider value={{ ...state, displayAlert }}>
			{children}{" "}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
