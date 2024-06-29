import { Modal } from "flowbite-react";
const ModalContainer = ({ openModal, setOpenModal, children }) => {
  return (
    // size to fit content in modal body
    // className="w-auto
    <Modal show={openModal}  popup onClose={setOpenModal} className="w-auto h-auto">
      <Modal.Header />
      <Modal.Body >{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
