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
	setFormPasswordError
}: LoginProps) => {

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
						helperText='Please input a valid email'
						iconLeft="email"
						size={16}
						autofocus
						onChangeSetter={setInputEmail}
						formEmailError={formEmailError}
						setFormEmailError={setFormEmailError}
						setFormPasswordError={setFormPasswordError}
					></Input>
					<Input
						placeholder="Password"
						helperText='Password must be at least 4 characters long'
						iconLeft="lock"
						size={16}
						onChangeSetter={setInputPassword}
						formPasswordError={formPasswordError}
						setFormEmailError={setFormEmailError}
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
						<img src="./src/assets/Google.svg"></img>
						<img src="./src/assets/Facebook.svg"></img>
						<img src="./src/assets/Twitter.svg"></img>
						<img src="./src/assets/Github.svg"></img>
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
