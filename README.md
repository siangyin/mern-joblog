# MERN Practice- Job Tracker App

### Table of Contents

- [Run app locally & setup React](#Run-app-locally-setup-React)
- [Front End](#Front End)

## Run App Locally & Setup React

<strong style="color: #f28482">Run app locally</strong>

```sh
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

```sh
npm start
```

- visit url http://localhost:3000/

<strong style="color: #f28482">Setup React App</strong>

- open terminal

```sh
mkdir client && cd client
npx create-react-app . || npx create-react-app@latest .
npm start
```

- copy/paste assets from complete project
- Spring Cleaning in src remove and fix following files :

  - remove: App.css, App.test.js, logo.svg, reportWebVitals.js, setupTests.js
  - fix: App.js & index.js

- update Title & Favicon

  - change title in public/index.html
  - replace favicon.ico in public
  - resource [Generate Favicons](https://favicon.io/)

- Normalize.css and Global Styles, small CSS file that provides cross-browser consistency in the default styling of HTML elements.

  - [normalize docs](https://necolas.github.io/normalize.css/)

  ```sh
  npm install normalize.css
  ```

  - import 'normalize.css' in index.js (note: import it before 'index.css')
  - replace contents of index.css from asset

  > more info: Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w) and Repo at [Default Starter Repo](https://github.com/john-smilga/default-starter)

## Front End

<strong style="color: #f28482">Landing page</strong>

- setup react router and styled components wrapper
- create pages directory in the source
- create page folder in src, and setup index to import/export
- create component folder in src, and setup index to import/export
- import logo.svg and main.svg in Landing.js
- Styled Components

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
  ```

<strong style="color: #f28482">Logo and Images</strong>

> resources: logo built in Figma and image from [Cool Images](https://undraw.co/)

<strong style="color: #f28482">React Router</strong>

- Version 6: [React Router Docs](https://reactrouter.com/docs/en/v6)

```sh
npm install history@5 react-router-dom@6
```

```js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

<BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<div>Error</div>}>
    </Routes>
</BrowserRouter>

```

```js
import { Link } from "react-router-dom";

return (
	<Link to="/register" className="btn btn-hero">
		Login / Register
	</Link>
);
```

<strong style="color: #f28482">Setup pages</strong>

- eg Error page setting

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
