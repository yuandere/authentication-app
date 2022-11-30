type ContentProps = {
  title: string;
  message: string
}

export interface AlertProps {
  alertModalRef: any;
  alertModalContent: ContentProps;
  setIsAlertModalOpen: (isAlertModalOpen: boolean) => void;
}

const AlertModal = ({ alertModalRef, alertModalContent, setIsAlertModalOpen }: AlertProps) => {
  return (
    <div className="alert-modal-container">
      <div className="alert-modal-inner" ref={alertModalRef}>
        <h3>{alertModalContent.title}</h3>
        <p>{alertModalContent.message}</p>
        <button onClick={() => setIsAlertModalOpen(false)}>Close</button>
      </div>
    </div>
  )
}

export default AlertModal