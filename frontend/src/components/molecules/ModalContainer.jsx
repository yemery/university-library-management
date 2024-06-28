import { Modal } from "flowbite-react";
const ModalContainer = ({ openModal, setOpenModal, children }) => {
  return (
    <Modal show={openModal} size="md" popup onClose={setOpenModal}>
      <Modal.Header />
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
