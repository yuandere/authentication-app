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
import { API_BASE_URL, REDIRECT_URI } from './util/constants';
import './App.css';

function App() {
	// login view
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const [loginFlag, setLoginFlag] = useState<boolean>(false);

	// form entry
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [inputPasswordConfirm, setInputPasswordConfirm] = useState<string>('');
	const [formEmailError, setFormEmailError] = useState<boolean>(false);
	const [formPasswordError, setFormPasswordError] = useState<boolean>(false);
	const [formPasswordConfirmError, setFormPasswordConfirmError] = useState<boolean>(false);
	const [inputName, setInputName] = useState<string>('');
	const [formNameError, setFormNameError] = useState<boolean>(false);
	const [inputBio, setInputBio] = useState<string>('');
	const [inputPhone, setInputPhone] = useState<number | string>('');
	const [inputPictureURL, setInputPictureURL] = useState<string>('');

	// main view
	const [profileEditFlag, setProfileEditFlag] = useState<boolean>(false);
	const [isEditPfpModalOpen, setIsEditPfpModalOpen] = useState<boolean>(false);
	const [deleteAccountFlag, setDeleteAccountFlag] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{
		name: string;
		bio: string;
		phone: number | string;
		email: string;
		password: string;
		picture_url: string;
		new_user: boolean;
		oauth_login: boolean;
		oauth_id?: string;
	}>({
		name: '',
		bio: '',
		phone: '',
		email: '',
		password: '',
		picture_url: '',
		new_user: false,
		oauth_login: false,
	});

	// other app states
	const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const [alertModalOptions, setAlertModalOptions] = useState<{
		title?: string;
		message?: string;
		style?: string;
	}>({ title: 'alert title', message: 'alert message' });
	const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
			.post(`${API_BASE_URL}/register`, {
				email: inputEmail,
				password: inputPassword,
			})
			.then((res) => {
				// console.log(res.data);
				setIsUserLoggedIn(true);
				setProfileEditFlag(true);
				setIsLoading(false);
				setUserInfo({
					name: '',
					bio: '',
					phone: '',
					email: inputEmail,
					password: '*'.repeat(inputPassword.length),
					picture_url: '',
					new_user: false,
					oauth_login: false,
				});
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 403) {
					setAlertModalOptions({
						title: ':(',
						message: 'That email is already in use!',
						style: 'error'
					});
					return;
				}
				setAlertModalOptions({
					title: err.code,
					message: err.message,
					style: 'error'
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
			.post(`${API_BASE_URL}/login`, {
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
					setAlertModalOptions({
						title: ':(',
						message: 'That email/password combination was not found!',
						style: 'error',
					});
					return;
				}
				setAlertModalOptions({
					title: err.code,
					message: err.message,
					style: 'error',
				});
			});
	};

	const submitEditProfile = async () => {
		if (!userInfo.oauth_login && inputPassword === userInfo.password) {
			setAlertModalOptions({ message: 'Please reenter or set a password'});
			setIsAlertModalOpen(true);
			return
		}
		if (!userInfo.oauth_login && inputPassword != inputPasswordConfirm) {
			setFormPasswordConfirmError(true);
			return
		}
		if (!userInfo.oauth_login && !emailValidate(inputEmail)) {
			setFormEmailError(true);
		}
		if (!userInfo.oauth_login && !passwordValidate(inputPassword)) {
			setFormPasswordError(true);
		}
		if (!minValidate(inputName)) {
			setFormNameError(true);
		}
		if (
			(!userInfo.oauth_login && !emailValidate(inputEmail)) ||
			(!userInfo.oauth_login && !passwordValidate(inputPassword)) ||
			!minValidate(inputName)
		) {
			return;
		}
		setIsLoading(true);
		const postObj = {
			name: inputName,
			bio: inputBio,
			phone: inputPhone,
			email: inputEmail,
			password: inputPassword,
			picture_url: inputPictureURL,
			new_user: false,
			...(userInfo.oauth_id ? { oauth_id: userInfo.oauth_id } : { curr_email: userInfo.email }),
			...(userInfo.oauth_id ? { oauth_login: true } : { oauth_login: false }),
		};
		axios
			.post(`${API_BASE_URL}/edit-profile`, postObj)
			.then((res) => {
				// console.log(res.data);
				setUserInfo(res.data);
				setProfileEditFlag(false);
				setIsLoading(false);
				setFormPasswordConfirmError(false);
				setInputPasswordConfirm('');
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 403) {
					setAlertModalOptions({
						title: ':(',
						message: 'Unable to update profile!',
						style: 'error',
					});
					return;
				}
				setAlertModalOptions({
					title: err.code,
					message: err.message,
					style: 'error',
				});
			});
	};

	const submitDeleteAccount = () => {
		const search = {
			...(userInfo.oauth_id
				? { oauth_id: userInfo.oauth_id }
				: { email: userInfo.email }),
		};
		setIsLoading(true);
		axios
			.post(`${API_BASE_URL}/delete-account`, search)
			.then((res) => {
				// console.log(res.data);
				setIsLoading(false);
				setAlertModalOptions({ title: 'Account deleted!', style: 'success' });
				setIsAlertModalOpen(true);
				setTimeout(logout, 3500);
			})
			.catch((err) => {
				setIsLoading(false);
				setIsAlertModalOpen(true);
				if (err.response.status === 403) {
					setAlertModalOptions({
						title: ':(',
						message: 'Something went wrong!',
						style: 'error'
					});
					return;
				}
				setAlertModalOptions({
					title: err.code,
					message: err.message,
					style: 'error'
				});
			});
	};

	const onLogin = (res: any) => {
		setIsUserLoggedIn(true);
		setIsLoading(false);
		setUserInfo(res.data);
		// console.log(res.data);
		if (res.data.new_user) {
			setProfileEditFlag(true);
		}
		setInputName(res.data.name);
		setInputBio(res.data.bio);
		setInputPhone(res.data.phone);
		setInputEmail(res.data.email);
		setInputPassword(res.data.password);
		setInputPictureURL(res.data.picture_url);
	};

	const logout = () => {
		window.location.href = REDIRECT_URI;
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

	// handle oauth code
	useEffect(() => {
		const auth_code = new URLSearchParams(window.location.search).get('code');
		const state = new URLSearchParams(window.location.search).get('state');
		if (
			userDataFetchedRef.current ||
			!auth_code ||
			sessionStorage.getItem('genstate') != state
		) {
			return;
		}
		const oauth_method = sessionStorage.getItem('oauthmethod');
		userDataFetchedRef.current = true;
		setIsLoading(true);
		axios
			.get(
				`${API_BASE_URL}/oauth/${oauth_method}?code=${auth_code}${
					oauth_method === 'twitter' ? `&verifier=${pkce.verifier}` : ''
				}`
			)
			.then((res) => {
				onLogin(res);
			})
			.catch((err) => {
				userDataFetchedRef.current = false;
				setIsLoading(false);
				setIsAlertModalOpen(true);
				setAlertModalOptions({
					title: err.code,
					message: err.message,
					style: 'error'
				});
				console.log('error:', err);
			});
	}, []);

	useEffect(() => {
		if (pkceGeneratedRef.current) {
			return;
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
					<img src="./Spinner-1s-200px.svg"></img>
				</div>
			) : null}
			{isAlertModalOpen ? (
				<AlertModal
					alertModalRef={alertModalRef}
					alertModalOptions={alertModalOptions}
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
							setInputPasswordConfirm={setInputPasswordConfirm}
							setIsEditPfpModalOpen={setIsEditPfpModalOpen}
							setIsAlertModalOpen={setIsAlertModalOpen}
							setAlertModalOptions={setAlertModalOptions}
							inputPassword={inputPassword}
							inputPictureURL={inputPictureURL}
							formPasswordError={formPasswordError}
							formPasswordConfirmError={formPasswordConfirmError}
							setFormPasswordError={setFormPasswordError}
							setFormPasswordConfirmError={setFormPasswordConfirmError}
							formEmailError={formEmailError}
							setFormEmailError={setFormEmailError}
							formNameError={formNameError}
							setFormNameError={setFormNameError}
							submitEditProfile={submitEditProfile}
							submitDeleteAccount={submitDeleteAccount}
							deleteAccountFlag={deleteAccountFlag}
							setDeleteAccountFlag={setDeleteAccountFlag}
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
