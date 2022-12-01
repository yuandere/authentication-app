import { useEffect, useState } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import Login from './containers/Login';
import AlertModal from './containers/AlertModal';
import Navbar from './containers/Navbar';
import UserInfoView from './containers/UserInfoView';
import { emailValidate, passwordValidate } from './form-validate';
import './App.css';

function App() {
	// login view
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [loginFlag, setLoginFlag] = useState<boolean>(false);

	// form entry
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [formEmailError, setFormEmailError] = useState<boolean>(false);
	const [formPasswordError, setFormPasswordError] = useState<boolean>(false);
	// main view
	const [isNewUser, setIsNewUser] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{
		name: string;
		bio: string;
		phone: number;
		email: string;
		password: string;
		picture_url: string;
	}>({
		name: 'Firstname Lastname',
		bio: 'bio',
		phone: 1234,
		email: 'email@email.com',
		password: 'password***',
		picture_url:
			'https://stylecaster.com/wp-content/uploads/2015/07/round-face.jpg',
	});

	// other
	const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [alertModalContent, setAlertModalContent] = useState<{
		title: string;
		message: string;
	}>({ title: 'alert title', message: 'alert message' });
	const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const alertModalRef = useOnclickOutside(() => {
		setIsAlertModalOpen(false);
	});

	const handleThemeChange = () => {
		const matchesDark = window.matchMedia('(prefers-color-scheme: dark)');
		!matchesDark.matches ? setIsThemeDark(false) : setIsThemeDark(true);
	};

	const submitRegister = async () => {
		if (!emailValidate(inputEmail)) {
			setFormEmailError(true);
		}
		if (!passwordValidate(inputPassword)) {
			setFormPasswordError(true);
		}
		if (!emailValidate(inputEmail) || !passwordValidate(inputPassword)) {
			return;
		}
		setIsLoading(true);
		axios
			.post('http://localhost:5000/register', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				console.log(res.data);
				setIsUserLoggedIn(true);
				setIsNewUser(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 403) {
					setAlertModalContent({
						title: ':P',
						message: 'That email is already in use!',
					});
					return;
				}
				setAlertModalContent({
					title: err.code,
					message: err.message,
				});
			});
	};

	const submitLogin = async () => {
		if (!emailValidate(inputEmail)) {
			setFormEmailError(true);
		}
		if (!passwordValidate(inputPassword)) {
			setFormPasswordError(true);
		}
		if (!emailValidate(inputEmail) || !passwordValidate(inputPassword)) {
			return;
		}
		setIsLoading(true);
		axios
			.post('http://localhost:5000/login', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				console.log(res.data);
				setUserInfo(res.data);
				setIsUserLoggedIn(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 401) {
					setAlertModalContent({
						title: ':(',
						message: 'That email/password combination was not found!',
					});
					return;
				}
				setAlertModalContent({
					title: err.code,
					message: err.message,
				});
			});
	};

	useEffect(() => {
		const matchesDark = window.matchMedia('(prefers-color-scheme: dark)');
		if (matchesDark.matches) {
			setIsThemeDark(true);
		}
		matchesDark.addEventListener('change', handleThemeChange);
		return () => {
			matchesDark.removeEventListener('change', handleThemeChange);
		};
	}, []);

	return (
		<div className="App">
			{isLoading ? (
				<div className="loading-screen">
					<img src="./src/assets/Spinner-1s-200px.svg"></img>
				</div>
			) : null}
			{isAlertModalOpen ? (
				<AlertModal
					alertModalRef={alertModalRef}
					alertModalContent={alertModalContent}
					setIsAlertModalOpen={setIsAlertModalOpen}
				></AlertModal>
			) : null}
			{isUserLoggedIn ? (
				<div className="container-main">
					<Navbar
						isThemeDark={isThemeDark}
						isNavMenuOpen={isNavMenuOpen}
						setIsNavMenuOpen={setIsNavMenuOpen}
						userInfo={userInfo}
					></Navbar>
					<div className="container-main-content">
						<UserInfoView userInfo={userInfo}></UserInfoView>
						<footer>
							<p>
								created by <span>@yuandere</span>
							</p>
							<p>devChallenges.io</p>
						</footer>
					</div>
					<button onClick={() => setIsAlertModalOpen(true)}>modal test</button>
					<button onClick={() => setIsUserLoggedIn(false)}>logout test</button>
				</div>
			) : (
				<div className="container">
					<Login
						isThemeDark={isThemeDark}
						loginFlag={loginFlag}
						setLoginFlag={setLoginFlag}
						setInputEmail={setInputEmail}
						setInputPassword={setInputPassword}
						submitRegister={submitRegister}
						submitLogin={submitLogin}
						formEmailError={formEmailError}
						formPasswordError={formPasswordError}
						setFormEmailError={setFormEmailError}
						setFormPasswordError={setFormPasswordError}
					></Login>
					<footer>
						<p>
							created by <span>@yuandere</span>
						</p>
						<p>devChallenges.io</p>
					</footer>
					<button onClick={() => setIsAlertModalOpen(true)}>modal test</button>
					<button onClick={() => setIsUserLoggedIn(true)}>login test</button>
				</div>
			)}
		</div>
	);
}

export default App;
