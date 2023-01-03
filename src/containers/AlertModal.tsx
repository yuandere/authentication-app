type ContentProps = {
	title?: string;
	message?: string;
	style?: string;
};

export interface AlertProps {
	alertModalRef: any;
	alertModalOptions: ContentProps;
	setIsAlertModalOpen: (isAlertModalOpen: boolean) => void;
}

const AlertModal = ({
	alertModalRef,
	alertModalOptions,
	setIsAlertModalOpen,
}: AlertProps) => {
	return (
		<div
			className={
				alertModalOptions.style
					? `alert-modal-container alert-modal-${alertModalOptions.style}`
					: 'alert-modal-container'
			}
		>
			<div className="alert-modal-inner" ref={alertModalRef}>
				<h3>{alertModalOptions.title ? alertModalOptions.title : ''}</h3>
				<p>{alertModalOptions.message ? alertModalOptions.message : ''}</p>
				<button onClick={() => setIsAlertModalOpen(false)}>Close</button>
			</div>
		</div>
	);
};

export default AlertModal;
