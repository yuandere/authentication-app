import Input from './Input';

export interface EditPfpProps {
	setInputPictureURL: (inputPictureURL: string) => void;
	setIsEditPfpModalOpen: (isEditPfpModalOpen: boolean) => void;
	inputPictureURL: string;
	userPictureURL: string;
}

const EditPfp = ({
	setInputPictureURL,
	setIsEditPfpModalOpen,
	inputPictureURL,
	userPictureURL,
}: EditPfpProps) => {
	return (
		<div className="edit-pfp-container">
			<div className="edit-pfp-inner flex flex-col align-center">
				<p style={{ marginTop: 0 }}>Please enter a new picture URL</p>
				<div className="edit-pfp-picture-container">
					<img
						src={inputPictureURL === '' ? userPictureURL : inputPictureURL}
					></img>
				</div>
				<Input
					placeholder="http://google.com/coolpic.jpg"
					onChangeSetter={setInputPictureURL}
					fullWidth
				></Input>
				<div className="btn-bar" style={{ marginTop: '0.25rem'}}>
					<button
            className='mr1 btn-cancel'
						onClick={() => {
							setIsEditPfpModalOpen(false);
							setInputPictureURL('');
						}}
					>
						Cancel
					</button>
					<button 
          className='btn-hollow'
          onClick={() => setIsEditPfpModalOpen(false)}>Change</button>
				</div>
			</div>
		</div>
	);
};

export default EditPfp;
