export interface LoginProps {
	isThemeDark: boolean;
	loginFlag: boolean;
	setLoginFlag: (loginFlag: boolean) => void;
}

const Login = ({ isThemeDark, loginFlag, setLoginFlag }: LoginProps) => {
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

					<div className="input-container">
						<span className="material-icons">email</span>
						<input type="text" placeholder="Email" size={16}></input>
					</div>
					<div className="input-container">
						<span className="material-icons">lock</span>
						<input type="text" placeholder="Password" size={16}></input>
					</div>
					{loginFlag ? (
						<button className="login-btn">
							<p>Login</p>
						</button>
					) : (
						<button className="login-btn">
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
