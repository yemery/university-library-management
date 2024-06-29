import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { borrowABook } from '../../features/borrow/borrowThunks';

function BorrowBook() {
    const id = useSelector((state) => state.books.bookID);
    const dispatch = useDispatch();
  const navigate = useNavigate();

    const bookBorrow = async () => {
        try {
            await dispatch(borrowABook(id));
            navigate(0); // refresh the page
        } catch (error) {
            console.log(error);
        }
        }
  return (
    <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to borrow the book with ID: {id}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={bookBorrow}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
  )
}

export default BorrowBook