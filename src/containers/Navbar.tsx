type UserInfoProps = {
	name: string;
	bio: string;
	phone: number | string;
	email: string;
	password: string;
	picture_url: string;
};

export interface NavbarProps {
	isThemeDark: boolean;
	isNavMenuOpen: boolean;
	setIsNavMenuOpen: (isNavMenuOpen: boolean) => void;
	userInfo: UserInfoProps;
	navRightRef: React.RefObject<HTMLDivElement>;
}

const NavbarProps = ({
	isThemeDark,
	isNavMenuOpen,
	setIsNavMenuOpen,
	userInfo,
	navRightRef,
}: NavbarProps) => {
	return (
		<nav>
			<img
				src={
					!isThemeDark
						? './devchallenges.svg'
						: './devchallenges-light.svg'
				}
			></img>
			<div className="nav-right" ref={navRightRef}>
				<div
					className="nav-pfp"
					onClick={() => {
						if (!isNavMenuOpen) {
							setIsNavMenuOpen(true);
						} else {
							setIsNavMenuOpen(false);
						}
					}}
				>
					<img
						src={
							userInfo.picture_url && userInfo.picture_url != ''
								? userInfo.picture_url
								: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='
						}
					></img>
				</div>
				<p
					className="nav-name"
					onClick={() => {
						if (!isNavMenuOpen) {
							setIsNavMenuOpen(true);
						} else {
							setIsNavMenuOpen(false);
						}
					}}
				>
					{userInfo.name ? (userInfo.name.length > 12
						? userInfo.name.slice(0, 11) + '...'
						: userInfo.name) : ''}
				</p>
				<div className="nav-dropdown-btn">
					<span className="material-icons">
						arrow_drop_{isNavMenuOpen ? 'up' : 'down'}
					</span>
				</div>
			</div>
		</nav>
	);
};

export default NavbarProps;
