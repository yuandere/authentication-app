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
}

const UserInfoView = ({ userInfo }: UserInfoViewProps) => {
	return (
		<>
			<h3 style={{ alignSelf: 'center' }}>Your Profile</h3>
			<div className="user-info-container">
				<div className="user-info-top"></div>
				<div className="user-info-bottom">
					<div className="user-info-row">
						<p className="text-light">NAME</p>
						<p>{userInfo.name}</p>
					</div>
					<div className="user-info-row">
						<p className="text-light">BIO</p>
						<p>{userInfo.bio}</p>
					</div>
					<div className="user-info-row">
						<p className="text-light">EMAIL</p>
						<p>{userInfo.email}</p>
					</div>
					<div className="user-info-row">
						<p className="text-light">PASSWORD</p>
						<p>{userInfo.password}</p>
					</div>
					<div className="user-info-row">
						<p className="text-light">PHONE</p>
						<p>{userInfo.phone}</p>
					</div>
					<div className="user-info-row">
						<p className="text-light">PHOTO</p>
            <div className="user-info-pfp">
            <img src={userInfo.picture_url}></img>
            </div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoView;
