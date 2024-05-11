import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function AddBook({ openModal, setOpenModal }) {
  return (
    <Modal show={openModal} size="md" popup onClose={setOpenModal}>
      <Modal.Header />
      <Modal.Body>
       <AddBookForm/>
      </Modal.Body>
    </Modal>
  );
}

export default AddBook;
