import { useEffect, useState } from 'react';
import Login from './containers/Login';
import './App.css';

function App() {
	const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [loginFlag, setLoginFlag] = useState<boolean>(false);

	// const [serverData, serverDataLoaded] =
  // useState<{ id: number, name: string }[]>([]);

	const handleThemeChange = () => {
		const matchesDark = window.matchMedia('(prefers-color-scheme: dark)');
		!matchesDark.matches ? setIsThemeDark(false) : setIsThemeDark(true)
	}

	useEffect(()=> {
		const matchesDark = window.matchMedia('(prefers-color-scheme: dark)');
		if (matchesDark.matches) {
			setIsThemeDark(true)
		}
		matchesDark.addEventListener('change', handleThemeChange);
		return () => {
			matchesDark.removeEventListener('change', handleThemeChange)
		}
	}, [])

	return (
		<div className="App">
			<div className='container'>
			{isUserLoggedIn ? (
				<div className="container">user info container goes here</div>
			) : (
				<Login
					isThemeDark={isThemeDark}
					loginFlag={loginFlag}
					setLoginFlag={setLoginFlag}
				></Login>
			)}
			<footer>
				<p>created by <span>@yuandere</span></p>
				<p>devChallenges.io</p>
			</footer>
			</div>
		</div>
	);
}

export default App;
