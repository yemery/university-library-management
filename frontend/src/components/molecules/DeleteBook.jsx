import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../features/book/bookThunks";
import { booksList } from "../../features/book/bookThunks";
import { toast } from "react-toastify";

function DeleteBook({close}) {
  const id = useSelector((state) => state.books.bookID);
  const dispatch = useDispatch();

  const bookDelete = async () => {
    try {
      await dispatch(deleteBook(id));
      toast.success("Book deleted successfully");
      dispatch(booksList());
      close()
    } catch (error) {
      console.log(error);
      toast.error("Bad request");
      close()
    }
  };

  return (
    <>
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the book with ID: {id}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={bookDelete}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

export default DeleteBook;
