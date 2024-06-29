import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booksList } from "../../features/book/bookThunks";
import { Button } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import AddBookForm from "../../components/molecules/AddBookForm";
import BooksTable from "../../components/atoms/BooksTable";
import DeleteBook from "../../components/molecules/DeleteBook";
import EditBookForm from "../../components/molecules/EditBookForm";
import BorrowBook from "../../components/molecules/BorrowBook";
import BooksSearchFilter from "../../components/molecules/BooksSearchFilter";
import { Pagination } from "flowbite-react";

function Books() {
  const dispatch = useDispatch();
  
  const totalPages=useSelector(state=>state.books.totalPages)

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // dispatch(booksList({ page: page }));
  }
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);

  const role = useSelector((state) => state.auth.role);
  // const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(booksList({ page: currentPage}));
  }, [currentPage]);
  // useEffect(() => {
  //   // console.log("books", books);
  //   dispatch(booksList({ page: currentPage }));
  // }, [currentPage]);

  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
  };

  const forms = {
    addBook: <AddBookForm />,
    editBook: <EditBookForm />,
    deleteBook: <DeleteBook />,
    borrowBook: <BorrowBook />,
    waitlistBook: <h1>Waitlist Book</h1>,
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        {role == "librarian" && (
          <Button
            className="w-80 bg-black  hover:opacity-75 text-white"
            onClick={() => handleModal("addBook")}
          >
            Add Book
          </Button>
        )}

        <BooksSearchFilter />
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
      <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
    </div>
  );
}

export default Books;
