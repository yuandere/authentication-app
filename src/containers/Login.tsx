import { v4 as uuidv4 } from 'uuid';
import {
	GITHUB_CLIENT_ID,
	FACEBOOK_CLIENT_ID,
	TWITTER_CLIENT_ID,
	REDIRECT_URI,
	GOOGLE_CLIENT_ID,
} from '../util/constants';
import Input from '../components/Input';

const REDIRECT_URL_NGROK = 'https://3206-104-59-98-29.ngrok.io';

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
	pkce,
}: LoginProps) => {
	let GEN_STATE: any = '';
	const generateState = () => {
		GEN_STATE = uuidv4();
		sessionStorage.setItem('genstate', GEN_STATE);
	};

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
						enterSubmit={loginFlag ? submitLogin : submitRegister}
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
								generateState();
								sessionStorage.setItem('oauthmethod', 'google');
								window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&response_type=code&state=${GEN_STATE}&redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`;
							}}
						></img>
						<img
							src="./src/assets/Facebook.svg"
							onClick={() => {
								generateState();
								sessionStorage.setItem('oauthmethod', 'facebook');
								window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI + '/'}&state=${GEN_STATE}`;
							}}
						></img>
						<img src="./src/assets/Twitter.svg" onClick={() => {
							generateState();
							sessionStorage.setItem('oauthmethod', 'twitter');
							window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${REDIRECT_URL_NGROK}&scope=tweet.read%20users.read%20offline.access&state=${GEN_STATE}&code_challenge=${pkce.challenge}&code_challenge_method=S256`
						}}></img>
						<img
							src="./src/assets/Github.svg"
							onClick={() => {
								generateState();
								sessionStorage.setItem('oauthmethod', 'github');
								window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${GEN_STATE}&redirect_uri=${REDIRECT_URI}`;
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
