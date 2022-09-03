# MERN Practice- Job Tracker App

#### Run The App Locally

```sh
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

```sh
npm start
```

- visit url http://localhost:3000/

#### Setup React App

- create client dir and react-app
- copy/paste assets from complete project

```sh
mkdir client && cd client
npx create-react-app . or npx create-react-app@latest .
npm start
```

**Spring Cleaning** in src remove the following files and fix App.js and index.js

- App.css
- App.test.js
- logo.svg
- reportWebVitals.js
- setupTests.js

**Title and Favicon**

- change title in public/index.html
- replace favicon.ico in public
- resource [Generate Favicons](https://favicon.io/)

#### Normalize.css and Global Styles

- CSS in JS (styled-components)
- saves times on the setup
- less lines of css
- speeds up the development
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

```sh
npm install normalize.css
```

- import 'normalize.css' in index.js before 'index.css'
- replace contents of index.css
- more detail at Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w) and Repo - [Default Starter Repo](https://github.com/john-smilga/default-starter)

#### Landing Page

- create pages & component directory in the src
- import logo.svg and main.svg

#### Styled Components

- wrappers folder in assets
- [Styled Components Docs](https://styled-components.com/)
- [Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

```sh
npm install styled-components
```

```js
import styled from "styled-components";

const El = styled.el`
	// styles go here
`;

const Wrapper = styled.el``;

const Component = () => {
	return (
		<Wrapper>
			<h1> Component</h1>
		</Wrapper>
	);
};
```

**Logo and Images**

- logo built in Figma
- [Cool Images](https://undraw.co/)

#### React Router

- Version 6: [React Router Docs](https://reactrouter.com/docs/en/v6)
- install react router and import four components

```sh
npm install history@5 react-router-dom@6
```

```js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


<BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<div>Error</div>}>
    </Routes>
</BrowserRouter>

// replace <a> to <Link> eg:

import { Link } from "react-router-dom";

return (
	<Link to="/register" className="btn btn-hero">
		Login / Register
	</Link>
);
```

#### Setup Pages

- create Not found, Register, Dashboard pages
- create main index.js in parent directory and import/ export all pages.

#### Error Page

```js
import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

return (
	<Wrapper className="full-page">
		<div>
			<img src={img} alt="not found" />
			<h3>text</h3>
			<p>text</p>
			<Link to="/">back home</Link>
		</div>
	</Wrapper>
);
```

#### Register Page - Setup

```js
import { useState, useEffect } from "react";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
// global context and useNavigate later

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};
// if possible prefer local state
// global state

function Register() {
	const [values, setValues] = useState(initialState);

	// global context and useNavigate later

	const handleChange = (e) => {
		console.log(e.target);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};
	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>Login</h3>

				{/* name field */}
				<div className="form-row">
					<label htmlFor="name" className="form-label">
						name
					</label>

					<input
						type="text"
						value={values.name}
						name="name"
						onChange={handleChange}
						className="form-input"
					/>
				</div>

				<button type="submit" className="btn btn-block">
					submit
				</button>
			</form>
		</Wrapper>
	);
}
```

#### FormRow Component

- create reusable component such as FormRow.js in <b>components</b>

```js
const FormRow = ({ type, name, value, handleChange, labelText }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>

			<input
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input"
			/>
		</div>
	);
};

export default FormRow;
```

#### Global Context

- in src create <b>context</b> directory
- actions.js
- reducer.js
- appContext.js

```js
import React, { useState, useReducer, useContext } from "react";

export const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	return (
		<AppContext.Provider
			value={{
				...state,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider };
```

- index.js

```js
import { AppProvider } from "./context/appContext";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
```

- Register.js

```js
import { useAppContext } from "../context/appContext";

const { isLoading, showAlert } = useAppContext();
```

#### useReducer

- [React Tutorial](https://youtu.be/iZhV0bILFb0)
- useReducer vs Redux
- multiple reducers vs one

#### Wire Up Reducer

```js
reducer.js;

const reducer = (state, action) => {
	throw new Error(`no such action :${action.type}`);
};
export default reducer;
```

```js
appContext.js;

import reducer from "./reducer";

const [state, dispatch] = useReducer(reducer, initialState);
```

#### Display Alert

```js
//actions.js;
export const DISPLAY_ALERT = "SHOW_ALERT";

//appContext.js
const displayAlert() =>{
  dispatch({type:DISPLAY_ALERT})
}

//reducer.js;
if (action.type === DISPLAY_ALERT) {
	return {
		...state,
		showAlert: true,
		alertType: "danger",
		alertText: "Please provide all values!",
	};
}

// Alert.js in Components;
import { useAppContext } from "../context/appContext";

const Alert = () => {
	const { alertType, alertText } = useAppContext();
	return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
```

# Backend

#### Setup Server

- stop the dev server in client
- cd ..
- start setting up our server
- setup package.json

```sh
npm init -y
```

- create server.js
- console.log('server running...')

```sh
node server
```

#### ES6 vs CommonJS

```js
CommonJS;

const express = require("express");
const app = express();
```

```js
ES6;

import express from "express";
const app = express();
```

- file extension .mjs

```js
//package.json to add

"type":"module"
```

#### Nodemon and Basic Express Server

```sh
npm install nodemon --save-dev
```

```js
package.json

"start":"nodemon server"

```

```sh
npm install express
```

```js
import express from "express";
const app = express();

app.get("/", (req, res) => {
	res.send("Welcome!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

#### Not Found Middleware

- in the root create <b>middleware</b> folder
- not-found.js
- setup function
- return 404 with message 'Route does not exist'
- import in server.js
- make sure to use .js extension
- place after home route

#### Error Middleware

- in the middleware create error-handler.js
- setup function
- accept 4 parameters, first one error
- log error
- return 500
- json({msg:'there was an error'})
- import in the server.js
- make sure to use .js extension
- place it last
- eventually handle Mongoose Errors, just like in the node-express
- showcase with async errors

#### ENV Variables

```sh
npm install dotenv
```

- import dotenv from 'dotenv'
- dotenv.config()
- create .env
- PORT=4000
- .gitignore
- /node_modules
- .env

#### Connect to MongoDB

- switched back to PORT=5000
- remove Error from '/'

- existing MongoDB Atlas Account

```sh
npm install mongoose
```

- create <b>db</b> folder
- create connect.js
- setup connectDB(url)
- in server.js create start() function
- get connection string
- setup as MONGO_URL in .env
- provide credentials and DB Name

#### Create Controller and Route Structure

- create <b>controllers</b>>authController.js

```js
const register = (req, res) => {
	res.send("register");
};
```

- create <b>routes</b>>authRoutes.js
- setup express router

```js
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(updateUser);

export default router;
```

- import authRouter in server.js

```js
app.use("/api/v1/auth", authRouter);
```

#### Postman

- set URL global var
- create new Collection and relevant folders, then setup routes

#### Setup Model

- <b>models</b> folder and files
- in each model file, to setup schema

#### Validate Email

```js
validate:{
  validator:(field)=> {return 2 > 1},
  message:'Please provide valid email'
  }
```

- [Validator Package](https://www.npmjs.com/package/validator)

```sh
npm install validator
```

- import in User.js
- validator.isEmail
