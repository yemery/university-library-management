import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { waitingListBook } from '../../features/borrow/borrowThunks';
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { booksList } from "../../features/book/bookThunks";

function WaitlistBook() {
    const id = useSelector((state) => state.books.bookID);
    const dispatch = useDispatch();

  const waitList = async () => {
    try {
        await dispatch(waitingListBook(id));
        toast.success("Reservation added to the waiting list");
        close()
        dispatch(booksList());
       
    } catch (error) {
        console.log(error);
        toast.error("Bad request");
        close()
    }
    }

  return (
    <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to register to the wailting list of the book with ID: {id}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={waitList}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
  )
}

export default WaitlistBook