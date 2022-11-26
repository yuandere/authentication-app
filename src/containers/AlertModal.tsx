type ContentProps = {
  title: string;
  message: string
}

export interface AlertProps {
  alertModalRef: any;
  alertModalContent: ContentProps;
}

const AlertModal = ({ alertModalRef, alertModalContent }: AlertProps) => {
  return (
    <div className="alert-modal-container">
      <div className="alert-modal-inner" ref={alertModalRef}>
        <h3>alert modal {alertModalContent.title}</h3>
        <p>details go here</p>
      </div>
    </div>
  )
}

export default AlertModal