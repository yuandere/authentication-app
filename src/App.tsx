import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import useOnclickOutside from 'react-cool-onclickoutside';
import getPkce from 'oauth-pkce';
import Login from './containers/Login';
import AlertModal from './containers/AlertModal';
import Navbar from './containers/Navbar';
import UserInfoView from './containers/UserInfoView';
import Dropdown from './components/Dropdown';
import EditPfp from './components/EditPfp';
import {
	emailValidate,
	passwordValidate,
	minValidate,
} from './util/form-validate';
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
	const [inputName, setInputName] = useState<string>('');
	const [formNameError, setFormNameError] = useState<boolean>(false);
	const [inputBio, setInputBio] = useState<string>('');
	const [inputPhone, setInputPhone] = useState<number | string>('');
	const [inputPictureURL, setInputPictureURL] = useState<string>('');

	// main view
	const [profileEditFlag, setProfileEditFlag] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{
		name: string;
		bio: string;
		phone: number | string;
		email: string;
		password: string;
		picture_url: string;
		oauth_id?: string;
	}>({
		name: '',
		bio: '',
		phone: '',
		email: '',
		password: '',
		picture_url: '',
	});

	// other app states
	const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [alertModalContent, setAlertModalContent] = useState<{
		title: string;
		message: string;
	}>({ title: 'alert title', message: 'alert message' });
	const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditPfpModalOpen, setIsEditPfpModalOpen] = useState<boolean>(false);
	const [pkce, setPkce] = useState<{ verifier: string; challenge: string }>({
		verifier: '',
		challenge: '',
	});
	const navRightRef = useRef<HTMLDivElement>(null);
	const pkceGeneratedRef = useRef<boolean>(false);
	const userDataFetchedRef = useRef<boolean>(false);

	const alertModalRef = useOnclickOutside(() => {
		setIsAlertModalOpen(false);
	});
	const navOpenRef = useOnclickOutside(() => {
		setIsNavMenuOpen(false);
	});
	const editPfpModalRef = useOnclickOutside(() => {
		setIsEditPfpModalOpen(false);
		setInputPictureURL('');
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
				setProfileEditFlag(true);
				setIsLoading(false);
				setUserInfo({
					name: '',
					bio: '',
					phone: '',
					email: inputEmail,
					password: inputPassword,
					picture_url: '',
				});
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 403) {
					setAlertModalContent({
						title: ':(',
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
			return;
		}
		setIsLoading(true);
		axios
			.post('http://localhost:5000/login', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				onLogin(res);
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

	const submitEditProfile = async () => {
		if (!userInfo.oauth_id && !emailValidate(inputEmail)) {
			setFormEmailError(true);
		}
		if (!userInfo.oauth_id && !passwordValidate(inputPassword)) {
			setFormPasswordError(true);
		}
		if (!minValidate(inputName)) {
			setFormNameError(true);
		}
		if (
			(!userInfo.oauth_id && !emailValidate(inputEmail)) ||
			(!userInfo.oauth_id && !passwordValidate(inputPassword)) ||
			!minValidate(inputName)
		) {
			return;
		}
		setIsLoading(true);
		if (userInfo.oauth_id) {
			axios
				.post('http://localhost:5000/edit-profile', {
					oauth_id: userInfo.oauth_id,
					name: inputName,
					bio: inputBio,
					phone: inputPhone,
					email: inputEmail,
					password: inputPassword,
					picture_url: inputPictureURL,
				})
				.then((res) => {
					console.log(res.data);
					setUserInfo(res.data.value);
					setProfileEditFlag(false);
					setIsLoading(false);
				})
				.catch((err) => {
					setIsLoading(false);
					setIsAlertModalOpen(true);
					if (err.response.status === 403) {
						setAlertModalContent({
							title: ':(',
							message: 'Unable to update profile!',
						});
						return;
					}
					setAlertModalContent({
						title: err.code,
						message: err.message,
					});
				});
		} else {
			axios
				.post('http://localhost:5000/edit-profile', {
					curr_email: userInfo.email,
					name: inputName,
					bio: inputBio,
					phone: inputPhone,
					email: inputEmail,
					password: inputPassword,
					picture_url: inputPictureURL,
				})
				.then((res) => {
					console.log(res.data);
					setUserInfo(res.data.value);
					setProfileEditFlag(false);
					setIsLoading(false);
				})
				.catch((err) => {
					setIsLoading(false);
					setIsAlertModalOpen(true);
					if (err.response.status === 403) {
						setAlertModalContent({
							title: ':(',
							message: 'Unable to update profile!',
						});
						return;
					}
					setAlertModalContent({
						title: err.code,
						message: err.message,
					});
				});
		}
	};

	const onLogin = (res: any) => {
		setIsUserLoggedIn(true);
		// setProfileEditFlag(true);
		setIsLoading(false);
		setUserInfo(res.data);
		console.log(res.data);
		setInputName(res.data.name);
		setInputBio(res.data.bio);
		setInputPhone(res.data.phone);
		setInputEmail(res.data.email);
		setInputPassword(res.data.password);
		setInputPictureURL(res.data.picture_url);
	};

	const logout = () => {
		window.location.href = 'http://localhost:5173';
	};

	const handleNavRefLocation = () => {
		const { current } = navRightRef;
		if (current) {
			let boundingRect = current.getBoundingClientRect();
			document.documentElement.style.setProperty(
				'--navMenuTop',
				`${boundingRect.top + boundingRect.height + 10}px`
			);
			document.documentElement.style.setProperty(
				'--navMenuLeft',
				`${boundingRect.left}px`
			);
			document.documentElement.style.setProperty(
				'--navMenuRight',
				`${boundingRect.right}px`
			);
			document.documentElement.style.setProperty(
				'--navMenuWidth',
				`${boundingRect.width}px`
			);
		}
	};

	// oauth
	useEffect(() => {
		const auth_code = new URLSearchParams(window.location.search).get('code');
		const state = new URLSearchParams(window.location.search).get('state');
		if (
			userDataFetchedRef.current || !auth_code || sessionStorage.getItem('genstate') != state
		) {
			return;
		}
		const oauth_method = sessionStorage.getItem('oauthmethod');
		userDataFetchedRef.current = true;
		setIsLoading(true);
		axios
			.get(`http://localhost:5000/oauth/${oauth_method}?code=${auth_code}${oauth_method === 'twitter' ? `&verifier=${pkce.verifier}` : ''}`)
			.then((res) => {
				onLogin(res);
			})
			.catch((err) => {
				userDataFetchedRef.current = false;
				setIsLoading(false);
				setIsAlertModalOpen(true);
				setAlertModalContent({
					title: err.code,
					message: err.message,
				});
				console.log('error:', err);
			});
	}, []);

	useEffect(() => {
		if (pkceGeneratedRef.current) {
			return
		}
		pkceGeneratedRef.current = true;
		getPkce(43, (error, { verifier, challenge }) => {
			if (!error) {
				// console.log({ verifier, challenge });
				setPkce({ verifier: verifier, challenge: challenge });
			}
		});
	}, []);

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

	useLayoutEffect(() => {
		window.addEventListener('resize', handleNavRefLocation);
		handleNavRefLocation();
		return () => {
			window.removeEventListener('resize', handleNavRefLocation);
		};
	}, [isUserLoggedIn]);

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
			{isNavMenuOpen ? (
				<Dropdown navOpenRef={navOpenRef} logout={logout}></Dropdown>
			) : null}
			{isEditPfpModalOpen ? (
				<EditPfp
					setInputPictureURL={setInputPictureURL}
					setIsEditPfpModalOpen={setIsEditPfpModalOpen}
					inputPictureURL={inputPictureURL}
					userPictureURL={userInfo.picture_url}
					editPfpModalRef={editPfpModalRef}
				></EditPfp>
			) : null}
			{isUserLoggedIn ? (
				<div className="container-main">
					<Navbar
						isThemeDark={isThemeDark}
						isNavMenuOpen={isNavMenuOpen}
						setIsNavMenuOpen={setIsNavMenuOpen}
						userInfo={userInfo}
						navRightRef={navRightRef}
					></Navbar>
					<div className="container-main-content">
						<UserInfoView
							userInfo={userInfo}
							profileEditFlag={profileEditFlag}
							setProfileEditFlag={setProfileEditFlag}
							setInputName={setInputName}
							setInputBio={setInputBio}
							setInputPhone={setInputPhone}
							setInputEmail={setInputEmail}
							setInputPassword={setInputPassword}
							setIsEditPfpModalOpen={setIsEditPfpModalOpen}
							inputPictureURL={inputPictureURL}
							formPasswordError={formPasswordError}
							setFormPasswordError={setFormPasswordError}
							formEmailError={formEmailError}
							setFormEmailError={setFormEmailError}
							formNameError={formNameError}
							setFormNameError={setFormNameError}
							submitEditProfile={submitEditProfile}
						></UserInfoView>
						<footer>
							<p>
								created by <span>@yuandere</span>
							</p>
							<p>devChallenges.io</p>
						</footer>
					</div>
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
						pkce={pkce}
					></Login>
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
