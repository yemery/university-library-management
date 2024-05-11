import { Modal } from 'flowbite-react'
const AddModel = ({openModal, setOpenModal, children}) => {
  return (
    <Modal show={openModal} size="md" popup onClose={setOpenModal}>
        <Modal.Header />
        <Modal.Body>
    {children}
        </Modal.Body>
    </Modal>
  )
}

export default AddModel