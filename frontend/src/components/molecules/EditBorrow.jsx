import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cancelBorrow,
  confirmBorrow,
} from "../../features/borrow/borrowThunks";
import { Button } from "flowbite-react";

function EditBorrow() {
  const borrowID = useSelector((state) => state.borrows.borrowID);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const borrowConfirmation = async () => {
    try {
      await dispatch(confirmBorrow(borrowID));
      navigate(0); // refresh the page
    } catch (error) {
      console.log(error);
    }
  };

  const borrowCancellation = async () => {
    try {
      await dispatch(cancelBorrow(borrowID));
      navigate(0); // refresh the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 class="text-xl font-medium text-gray-900 text-center">
        updating the borrow status
      </h2>
      <div className="flex justify-center gap-4">
        <Button color="success" onClick={borrowConfirmation}>
          confirm borrow
        </Button>
        <Button color="failure" onClick={borrowCancellation}>
          cancel borrow
        </Button>
      </div>
    </div>
  );
}

export default EditBorrow;
