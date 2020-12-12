import { Modal } from 'react-bootstrap'

const Popup = ({ show, handleModal, color, children }) => {
  const textColor = color === 'maroon' ? 'white' : 'black'
  return (
    <Modal centered show={show} onHide={() => handleModal(false)}>
      <Modal.Body style={{ backgroundColor: `${color}`, color: `${textColor}`}}>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default Popup