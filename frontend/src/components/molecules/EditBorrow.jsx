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
  
    <div className="text-center">
      {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Confirm or cancel the borrow request
      </h3>
      <div className="flex justify-center gap-4">
        <Button color="gray" onClick={borrowCancellation}>
          No, cancel
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-400" onClick={borrowConfirmation}>
          Yes, confirm
        </Button>
      </div>
    </div>
  );
}

export default EditBorrow;
