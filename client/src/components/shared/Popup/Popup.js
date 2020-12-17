import { Modal } from 'react-bootstrap'

const Popup = ({ show, handleModal, color, children }) => {
  const textColor = color === '#f8d7da' ? '#721c24' : 'black'
  return (
    <Modal centered show={show} onHide={() => handleModal(false)}>
      <Modal.Body style={{ backgroundColor: `${color}`, color: `${textColor}` }}>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default Popup