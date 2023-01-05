import Input from '../components/Input';

type UserInfoProps = {
	name: string;
	bio: string;
	phone: number | string;
	email: string;
	password: string;
	picture_url: string;
	new_user: boolean;
	oauth_login: boolean;
	oauth_id?: string;
};

export interface UserInfoViewProps {
	userInfo: UserInfoProps;
	profileEditFlag: boolean;
	setProfileEditFlag: (profileEditFlag: boolean) => void;
	setInputName: (inputName: string) => void;
	setInputBio: (inputBio: string) => void;
	setInputPhone: (inputPhone: number | string) => void;
	setInputEmail: (inputEmail: string) => void;
	setInputPassword: (inputPassword: string) => void;
	setInputPasswordConfirm: (inputPasswordConfirm: string) => void;
	setIsEditPfpModalOpen: (isEditPfpModalOpen: boolean) => void;
	setIsAlertModalOpen: (isAlertModalOpen: boolean) => void;
	setAlertModalOptions: (alertModalOptions: {
		title?: string;
		message?: string;
		style?: string;
	}) => void;
	inputPassword: string;
	inputPictureURL: string;
	formPasswordError: boolean;
	formPasswordConfirmError: boolean;
	setFormPasswordError: (formPasswordError: boolean) => void;
	setFormPasswordConfirmError: (formPasswordConfirmError: boolean) => void;
	formEmailError: boolean;
	setFormEmailError: (formEmailError: boolean) => void;
	formNameError: boolean;
	setFormNameError: (formNameError: boolean) => void;
	submitEditProfile: () => void;
	submitDeleteAccount: () => void;
	deleteAccountFlag: boolean;
	setDeleteAccountFlag: (deleteAccountFlag: boolean) => void;
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
	setInputPasswordConfirm,
	setIsEditPfpModalOpen,
	setIsAlertModalOpen,
	setAlertModalOptions,
	inputPassword,
	inputPictureURL,
	formPasswordError,
	formPasswordConfirmError,
	setFormPasswordError,
	setFormPasswordConfirmError,
	formEmailError,
	setFormEmailError,
	formNameError,
	setFormNameError,
	submitEditProfile,
	submitDeleteAccount,
	deleteAccountFlag,
	setDeleteAccountFlag,
}: UserInfoViewProps) => {
	const resetInputs = () => {
		setProfileEditFlag(false);
		setDeleteAccountFlag(false);
		setInputName(userInfo.name);
		setInputBio(userInfo.bio);
		setInputPhone(userInfo.phone);
		setInputEmail(userInfo.email);
		setInputPassword(userInfo.password);
		setFormNameError(false);
		setFormEmailError(false);
		setFormPasswordError(false);
		setFormPasswordConfirmError(false);
	}
	return (
		<>
			{profileEditFlag ? (
				<>
					<div
						className="user-edit-back-btn"
						onClick={resetInputs}
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
											inputPictureURL && inputPictureURL != ''
												? inputPictureURL
												: userInfo.picture_url != '' && userInfo.picture_url
												? userInfo.picture_url
												: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='
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
								value={userInfo.name}
								onChangeSetter={setInputName}
								formNameError={formNameError}
								setFormNameError={setFormNameError}
							></Input>
							<Input
								placeholder="Enter your bio..."
								labelText="Bio"
								multiline
								size={16}
								value={userInfo.bio}
								onChangeSetter={setInputBio}
							></Input>
							<Input
								placeholder="Enter your phone..."
								labelText="Phone"
								helperText="Number is not valid"
								size={16}
								value={userInfo.phone}
								onChangeSetter={setInputPhone}
							></Input>
							<Input
								placeholder="Enter your email..."
								labelText="Email"
								helperText="Email is not valid"
								size={16}
								value={userInfo.email}
								onChangeSetter={setInputEmail}
								formEmailError={formEmailError}
								setFormEmailError={setFormEmailError}
								disabled={userInfo.oauth_login ? true : undefined}
							></Input>
							<Input
								placeholder="Enter your new password..."
								labelText="Password"
								helperText="Password must be at least 4 characters"
								password
								size={16}
								value={inputPassword}
								onChangeSetter={setInputPassword}
								formPasswordError={formPasswordError}
								setFormPasswordError={setFormPasswordError}
								disabled={userInfo.oauth_login ? true : undefined}
							></Input>
							<Input
								labelText="Confirm Password"
								helperText="Passwords must match"
								password
								size={16}
								value=''
								onChangeSetter={setInputPasswordConfirm}
								formPasswordConfirmError={formPasswordConfirmError}
								setFormPasswordConfirmError={setFormPasswordError}
								disabled={userInfo.oauth_login ? true : undefined}
								enterSubmit={submitEditProfile}
							></Input>
							<div className="btn-bar">
								<button
									id="delete-btn"
									onClick={() => {
										if (deleteAccountFlag) {
											submitDeleteAccount();
										} else {
											setAlertModalOptions({
												title: 'This action is irreversible!',
												message:
													'If you wish to continue close this popup and try again.',
												style: 'caution',
											});
											setIsAlertModalOpen(true);
											setDeleteAccountFlag(true);
										}
									}}
								>
									Delete Account
								</button>
								<button onClick={submitEditProfile}>Save</button>
							</div>
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
										<img
											src={
												userInfo.picture_url && userInfo.picture_url != ''
													? userInfo.picture_url
													: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='
											}
										></img>
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
