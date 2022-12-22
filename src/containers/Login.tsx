import { v4 as uuidv4 } from 'uuid';
import {
	GITHUB_CLIENT_ID,
	FACEBOOK_CLIENT_ID,
	REDIRECT_URI,
} from '../util/constants';
import Input from '../components/Input';

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
}: LoginProps) => {
	let FB_OAUTH_STATE: any = '';
	const setFbStateString = () => {
		console.log('login prop rendered')
		const stored = sessionStorage.getItem('fbstate');
		if (stored === null) {
			FB_OAUTH_STATE = uuidv4();
			console.log(FB_OAUTH_STATE);
			sessionStorage.setItem('fbstate', FB_OAUTH_STATE)
		} else {
			FB_OAUTH_STATE = stored
		}
	}
	setFbStateString();

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
								setIsLoading(true);
								googleLogin();
							}}
						></img>
						<a
							href={`https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${FB_OAUTH_STATE}`}
						>
							<img src="./src/assets/Facebook.svg"></img>
						</a>

						<img src="./src/assets/Twitter.svg"></img>
						<a
							href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`}
						>
							<img src="./src/assets/Github.svg"></img>
						</a>
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
