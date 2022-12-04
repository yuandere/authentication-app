type UserInfoProps = {
	name: string;
	bio: string;
	phone: number;
	email: string;
	password: string;
	picture_url: string;
};

export interface UserInfoViewProps {
	userInfo: UserInfoProps;
	profileEditFlag: boolean;
	setProfileEditFlag: (profileEditFlag: boolean) => void;
}

const UserInfoView = ({ userInfo }: UserInfoViewProps) => {
	return (
		<>
		
			<h2 style={{ alignSelf: 'center', marginBottom: '0' }}>Personal info</h2>
			<p style={{ alignSelf: 'center', marginBottom: '2rem' }}>
				Basic info, like your name and photo
			</p>
			<div className="user-info-container">
				<div className="user-info-top">
					<div className="user-info-top-left">
						<h3 style={{ marginBottom: 0 }}>Profile</h3>
						<p className="text-smaller">
							Some info may be visible to other people
						</p>
					</div>
					<div className="user-info-top-right">
						<button className="btn-hollow">Edit</button>
					</div>
				</div>
				<div className="user-info-bottom">
					<div className="user-info-row">
						<p className="text-light text-sm">PHOTO</p>
						<div className="user-info-row-right">
							<div className="user-info-pfp">
								<img src={userInfo.picture_url}></img>
							</div>
						</div>
					</div>
					<div className="user-info-row">
						<p className="text-light text-sm">NAME</p>
						<div className="user-info-row-right">
							<p>{userInfo.name}</p>
						</div>
					</div>
					<div className="user-info-row">
						<p className="text-light text-sm">BIO</p>
						<div className="user-info-row-right">
							<p>{userInfo.bio}</p>
						</div>
					</div>
					<div className="user-info-row">
						<p className="text-light text-sm">PHONE</p>
						<div className="user-info-row-right">
							<p>{userInfo.phone}</p>
						</div>
					</div>
					<div className="user-info-row">
						<p className="text-light text-sm">EMAIL</p>
						<div className="user-info-row-right">
							<p>{userInfo.email}</p>
						</div>
					</div>
					<div className="user-info-row">
						<p className="text-light text-sm">PASSWORD</p>
						<div className="user-info-row-right">
							<p>{userInfo.password}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoView;
