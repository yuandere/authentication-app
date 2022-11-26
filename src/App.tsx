import { useEffect, useState } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import Login from './containers/Login';
import AlertModal from './containers/AlertModal';
import Navbar from './containers/Navbar';
import UserInfoView from './containers/UserInfoView';
import './App.css';

function App() {
	const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [loginFlag, setLoginFlag] = useState<boolean>(false);
	const [isNewUser, setIsNewUser] = useState<boolean>(false);

	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');

	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [alertModalContent, setAlertModalContent] = useState<{
		title: string;
		message: string;
	}>({ title: 'alert title', message: 'alert message' });

	const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{
		name: string;
		bio: string;
		phone: number;
		email: string;
		password: string;
		picture_url: string
	}>({
		name: 'name',
		bio: 'bio',
		phone: 1234,
		email: 'email',
		password: 'password',
		picture_url: 'pic url',
	});

	const alertModalRef = useOnclickOutside(() => {
		setIsAlertModalOpen(false);
	});

	const handleThemeChange = () => {
		const matchesDark = window.matchMedia('(prefers-color-scheme: dark)');
		!matchesDark.matches ? setIsThemeDark(false) : setIsThemeDark(true);
	};

	const submitRegister = async () => {
		if (inputEmail === '' || inputPassword === '') {
			return;
		}
		axios
			.post('http://localhost:5000/register', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				console.log(res.data);
				setIsUserLoggedIn(true);
				setIsNewUser(true);
			})
			.catch((err) => {
				console.log(err);
				setIsAlertModalOpen(true);
				setAlertModalContent({
					title: 'an error has occurred',
					message: 'placeholder error',
				});
			});
	};

	const submitLogin = async () => {
		if (inputEmail === '' || inputPassword === '') {
			return;
		}
		axios
			.post('http://localhost:5000/login', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				console.log(res.data);
				setUserInfo(res.data);
				setIsUserLoggedIn(true);
			})
			.catch((err) => {
				console.log(err);
				setIsAlertModalOpen(true);
				setAlertModalContent({
					title: 'an error has occurred',
					message: 'placeholder error',
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
			{isAlertModalOpen ? (
				<AlertModal
					alertModalRef={alertModalRef}
					alertModalContent={alertModalContent}
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
					<UserInfoView userInfo={userInfo}></UserInfoView>
					<button onClick={() => setIsAlertModalOpen(true)}>modal test</button>
					<button onClick={() => setIsUserLoggedIn(false)}>logout test</button>
					<footer>
						<p>
							created by <span>@yuandere</span>
						</p>
						<p>devChallenges.io</p>
					</footer>
				</div>
			) : (
				<div className="container">
					<Login
						isThemeDark={isThemeDark}
						loginFlag={loginFlag}
						setLoginFlag={setLoginFlag}
						inputEmail={inputEmail}
						setInputEmail={setInputEmail}
						setInputPassword={setInputPassword}
						submitRegister={submitRegister}
						submitLogin={submitLogin}
					></Login>
					<button onClick={() => setIsAlertModalOpen(true)}>modal test</button>
					<button onClick={() => setIsUserLoggedIn(true)}>login test</button>
					<footer>
						<p>
							created by <span>@yuandere</span>
						</p>
						<p>devChallenges.io</p>
					</footer>
				</div>
			)}
		</div>
	);
}

export default App;
