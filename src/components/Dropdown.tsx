export interface DropdownProps {
	navOpenRef: any;
	setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
	setIsNavMenuOpen: (isNavMenuOpen: boolean) => void;
}

export const Dropdown = ({
	navOpenRef,
	setIsUserLoggedIn,
	setIsNavMenuOpen,
}: DropdownProps) => {
	return (
		<div className="nav-dropdown-container">
			<div className="nav-dropdown" ref={navOpenRef}>
				<div className="nav-dropdown-item">
					<span className="material-icons">account_circle</span>
					<p>My Profile</p>
				</div>
				<div className="nav-dropdown-item">
					<span className="material-icons">people</span>
					<p>Group Chat</p>
				</div>
				<div className="nav-dropdown-hr"></div>
				<div
					className="nav-dropdown-item nav-dropdown-item-red"
					onClick={() => {
						setIsUserLoggedIn(false);
						setIsNavMenuOpen(false);
					}}
				>
					<span className="material-icons">logout</span>
					<p>Logout</p>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
