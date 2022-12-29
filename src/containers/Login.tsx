import { v4 as uuidv4 } from 'uuid';
import {
	GITHUB_CLIENT_ID,
	FACEBOOK_CLIENT_ID,
	TWITTER_CLIENT_ID,
	REDIRECT_URI,
} from '../util/constants';
import Input from '../components/Input';

const REDIRECT_URL_NGROK = 'https://52fc-89-187-187-89.ngrok.io';

export interface LoginProps {
	isThemeDark: boolean;
	loginFlag: boolean;
	setLoginFlag: (loginFlag: boolean) => void;
	setInputEmail: (inputEmail: string) => void;
	setInputPassword: (inputPassword: string) => void;
	submitRegister: () => void;
	submitLogin: () => void;
	formEmailError: boolean;
	formPasswordError: boolean;
	setFormEmailError: (formEmailError: boolean) => void;
	setFormPasswordError: (formPasswordError: boolean) => void;
	googleLogin: () => void;
	setIsLoading: (isLoading: boolean) => void;
	pkce: any;
}

const Login = ({
	isThemeDark,
	loginFlag,
	setLoginFlag,
	setInputEmail,
	setInputPassword,
	submitRegister,
	submitLogin,
	formEmailError,
	formPasswordError,
	setFormEmailError,
	setFormPasswordError,
	googleLogin,
	setIsLoading,
	pkce,
}: LoginProps) => {
	let FB_OAUTH_STATE: any = '';
	const setFbStateString = () => {
		const stored = sessionStorage.getItem('fbstate');
		if (stored === null) {
			FB_OAUTH_STATE = uuidv4();
			sessionStorage.setItem('fbstate', FB_OAUTH_STATE);
		} else {
			FB_OAUTH_STATE = stored;
		}
	};

	let TWITTER_OAUTH_STATE: any = '';
	const setTwitterStateString = () => {
		const stored = sessionStorage.getItem('twitterstate');
		sessionStorage.setItem('oauthmethod', 'twitter');
		if (stored === null) {
			TWITTER_OAUTH_STATE = uuidv4();
			sessionStorage.setItem('twitterstate', TWITTER_OAUTH_STATE);
		} else {
			TWITTER_OAUTH_STATE = stored;
		}
	};

	// let TWITTER_OAUTH_VERIFIER: any = '';
	// let TWITTER_OAUTH_CHALLENGE: any = '';
	// const setTwitterCodeChallenge = () => {
	// 	const stored = sessionStorage.getItem('twitterchallenge');
	// 	if (stored === null) {
	// 		// TWITTER_OAUTH_VERIFIER = uuidv4();
	// 		// TWITTER_OAUTH_CHALLENGE = btoa(sha256(TWITTER_OAUTH_VERIFIER).toString())
	// 		// .replace(/\+/g, '-')
	// 		// .replace(/\//g, '_')
	// 		// .replace(/=+$/, '');

	// 		sessionStorage.setItem('twitterverifier', TWITTER_OAUTH_VERIFIER);
	// 		sessionStorage.setItem('twitterchallenge', TWITTER_OAUTH_CHALLENGE);
	// 	} else {
	// 		TWITTER_OAUTH_VERIFIER = sessionStorage.getItem('twitterverifier');
	// 		TWITTER_OAUTH_CHALLENGE = stored;
	// 	}
	// };


	// let TEST_VERIFIER = uuidv4();
	// let TEST_CHALLENGE = btoa(sha256(TEST_VERIFIER).toString())
	// 	.replace(/\+/g, '-')
	// 	.replace(/\//g, '_')
	// 	.replace(/=+$/, '');
	// console.log('twitter oauth verifier, challenge:', TEST_VERIFIER,TEST_CHALLENGE);

	return (
		<div className="login-container">
			<div className="login-container-inner">
				<div className="login-top">
					<img
						src={
							!isThemeDark
								? './src/assets/devchallenges.svg'
								: './src/assets/devchallenges-light.svg'
						}
					></img>
				</div>
				<div className="login-middle">
					{loginFlag ? (
						<h3>Login</h3>
					) : (
						<>
							<p className="register-top">
								Join thousands of learners from around the world
							</p>
							<p className="register-text">
								Master web development by making real-life projects. There are
								multiple paths to choose from
							</p>
						</>
					)}
					<Input
						placeholder="Email"
						helperText="Email is not valid"
						iconLeft="email"
						size={16}
						autofocus
						onChangeSetter={setInputEmail}
						formEmailError={formEmailError}
						setFormEmailError={setFormEmailError}
					></Input>
					<Input
						placeholder="Password"
						helperText="Password must be at least 4 characters"
						iconLeft="lock"
						size={16}
						onChangeSetter={setInputPassword}
						formPasswordError={!loginFlag ? formPasswordError : false}
						setFormPasswordError={setFormPasswordError}
					></Input>

					{loginFlag ? (
						<button className="login-btn" onClick={submitLogin}>
							<p>Login</p>
						</button>
					) : (
						<button className="login-btn" onClick={submitRegister}>
							<p>Start coding now</p>
						</button>
					)}
				</div>

				<div className="login-bottom">
					<p>or continue with one of these</p>
					<div className="socials-container">
						<img
							src="./src/assets/Google.svg"
							onClick={() => {
								googleLogin();
							}}
						></img>
						<img
							src="./src/assets/Facebook.svg"
							onClick={() => {
								setFbStateString();
								sessionStorage.setItem('oauthmethod', 'facebook');
								window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${FB_OAUTH_STATE}`;
							}}
						></img>
						<img src="./src/assets/Twitter.svg" onClick={() => {
							setTwitterStateString();
							// setTwitterCodeChallenge();
							sessionStorage.setItem('oauthmethod', 'twitter');
							window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${REDIRECT_URL_NGROK}&scope=tweet.read%20users.read%20offline.access&state=${TWITTER_OAUTH_STATE}&code_challenge=${pkce.challenge}&code_challenge_method=S256`
						}}></img>
						<img
							src="./src/assets/Github.svg"
							onClick={() => {
								sessionStorage.setItem('oauthmethod', 'github');
								window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
							}}
						></img>
					</div>
					<p className="login-bottom-element">
						Don't have an account yet?&nbsp;
						{loginFlag ? (
							<span
								onClick={() => {
									setLoginFlag(false);
								}}
							>
								Register
							</span>
						) : (
							<span
								onClick={() => {
									setLoginFlag(true);
								}}
							>
								Login
							</span>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
