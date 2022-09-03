import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Register from "./pages/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="*" element={<Error />} />
			</Routes>
			<Landing />
		</BrowserRouter>
	);
}

export default App;
