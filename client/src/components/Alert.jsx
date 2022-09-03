// import { useAppContext } from "../context/appContext";

const Alert = ({ alertType, alertText }) => {
	// const { alertType, alertText } = useAppContext();
	return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
