import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { booksList } from "../../features/book/bookThunks";
import { booksSelectOptions } from "../../assets/filteringOptions";
import { Button } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import AddBookForm from "../../components/molecules/AddBookForm";
import SelectFilter from "../../components/atoms/SelectFilter";
import SearchFilter from "../../components/atoms/SearchFilter";
import BooksTable from "../../components/atoms/BooksTable";
import DeleteBook from "../../components/molecules/DeleteBook";
import EditBookForm from "../../components/molecules/EditBookForm";
import BorrowBook from "../../components/molecules/BorrowBook";

function Books() {
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(booksList());
  }, []);

  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
  };

  const forms = {
    addBook: <AddBookForm />,
    editBook: <EditBookForm />,
    deleteBook: <DeleteBook />,
    borrowBook: <BorrowBook/>,
    waitlistBook: <h1>Waitlist Book</h1>,
  };

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        <Button
          className="w-80 bg-black  hover:opacity-75 text-white"
          onClick={() => handleModal("addBook")}
        >
          Add Book
        </Button>

        <SelectFilter options={booksSelectOptions} />
        <SearchFilter />
      </div>
      <ModalContainer
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      >
        {forms[modalForm]}
      </ModalContainer>

      <BooksTable
        editModal={() => handleModal("editBook")}
        deleteModal={() => handleModal("deleteBook")}
        borrowModal={() => handleModal("borrowBook")}
        waitlistModal={() => handleModal("waitlistBook")}
      />
    </div>
  );
}

export default Books;
