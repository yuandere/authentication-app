type UserInfoProps = {
  name: string;
  bio: string;
  phone: number;
  email: string;
  password: string;
  picture_url: string;
}

export interface NavbarProps {
	isThemeDark: boolean;
	isNavMenuOpen: boolean;
	setIsNavMenuOpen: (isNavMenuOpen: boolean) => void;
  userInfo: UserInfoProps;
}

const NavbarProps = ({
	isThemeDark,
	isNavMenuOpen,
	setIsNavMenuOpen,
  userInfo
}: NavbarProps) => {
	return (
		<nav>
			<img
				src={
					!isThemeDark
						? './src/assets/devchallenges.svg'
						: './src/assets/devchallenges-light.svg'
				}
			></img>
			<div
				className="nav-right"
				onClick={() => {
					if (!isNavMenuOpen) {
						setIsNavMenuOpen(true);
					} else {
						setIsNavMenuOpen(false);
					}
				}}
			>
				<div className="nav-pfp">
					<img src=""></img>
				</div>
				<h4>{userInfo.name}</h4>
				<div className="nav-dropdown-btn">
					<span className="material-icons">arrow_drop_{isNavMenuOpen ? 'down' : 'up'}</span>
				</div>
			</div>
		</nav>
	);
};

export default NavbarProps;
