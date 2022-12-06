import Input from '../components/Input';

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
	setInputName: (inputName: string) => void;
	setInputBio: (inputBio: string) => void;
	setInputPhone: (inputPhone: number) => void;
	setInputEmail: (inputEmail: string) => void;
	setInputPassword: (inputPassword: string) => void;
	setIsEditPfpModalOpen: (isEditPfpModalOpen: boolean) => void;
	inputPictureURL: string;
}

const UserInfoView = ({
	userInfo,
	profileEditFlag,
	setProfileEditFlag,
	setInputName,
	setInputBio,
	setInputPhone,
	setInputEmail,
	setInputPassword,
	setIsEditPfpModalOpen,
	inputPictureURL,
}: UserInfoViewProps) => {
	return (
		<>
			{profileEditFlag ? (
				<>
					<div
						className="user-edit-back-btn"
						onClick={() => setProfileEditFlag(false)}
					>
						<span className="material-icons">chevron_left</span>
						<p>Back</p>
					</div>
					<div className="user-info-container">
						<div className="user-info-content flex flex-col">
							<h3 className="m0">Change Info</h3>
							<p className="m0 mb1 text-sm">
								Changes will be reflected in all services
							</p>
							<div
								className="flex align-center text-sm text-light mb1 user-edit-pfp-container"
								onClick={() => setIsEditPfpModalOpen(true)}
							>
								<div className="user-edit-pfp">
									<div className="user-edit-pfp-overlay">
										<span className="material-icons">photo_camera</span>
									</div>
									<img
										src={
											inputPictureURL === ''
												? userInfo.picture_url
												: inputPictureURL
										}
									></img>
								</div>
								<p className="ml1">CHANGE PHOTO</p>
							</div>
							<Input
								placeholder="Enter your name..."
								labelText="Name"
								helperText="Name cannot be empty"
								size={16}
								autofocus
								onChangeSetter={setInputEmail}
							></Input>
							<Input
								placeholder="Enter your bio..."
								labelText="Bio"
								multiline
								size={16}
								onChangeSetter={setInputEmail}
							></Input>
							<Input
								placeholder="Enter your phone..."
								labelText="Phone"
								helperText="Number is not valid"
								size={16}
								onChangeSetter={setInputEmail}
							></Input>
							<Input
								placeholder="Enter your email..."
								labelText="Email"
								helperText="Email is not valid"
								size={16}
								onChangeSetter={setInputEmail}
							></Input>
							<Input
								placeholder="Enter your new password..."
								labelText="Password"
								helperText="Password must be at least 4 characters"
								size={16}
								autofocus
								onChangeSetter={setInputEmail}
							></Input>
							<button>Save</button>
						</div>
					</div>
				</>
			) : (
				<>
					<h2 style={{ alignSelf: 'center', marginBottom: '0' }}>
						Personal info
					</h2>
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
								<button
									className="btn-hollow"
									onClick={() => setProfileEditFlag(true)}
								>
									Edit
								</button>
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
			)}
		</>
	);
};

export default UserInfoView;
