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
import WaitlistBook from "../../components/molecules/WaitlistBook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    dispatch(booksList({ page: currentPage}));
  }, [currentPage]);


  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
  };

  const close = () => {
    setOpenModal(false);
  }

  const forms = {
    addBook: <AddBookForm  close={close} />,
    editBook: <EditBookForm  close={close}/>,
    deleteBook: <DeleteBook  close={close}/>,
    borrowBook: <BorrowBook  close={close}/>,
    waitlistBook: <WaitlistBook close={close}/>,
  };

  return (
    <div>
      <div className="flex  gap-8">
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
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Books;
