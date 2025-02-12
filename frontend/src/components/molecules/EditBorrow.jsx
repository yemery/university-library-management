import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  borrowsList,
  cancelBorrow,
  confirmBorrow,
} from "../../features/borrow/borrowThunks";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
function EditBorrow({close}) {
  const borrowID = useSelector((state) => state.borrows.borrowID);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const borrowConfirmation = async () => {
    try {
      await dispatch(confirmBorrow(borrowID));
      toast.success("Borrow confirmed successfully");
      close();
      dispatch(borrowsList());
    } catch (error) {
      console.log(error);
    }
  };

  const borrowCancellation = async () => {
    try {
      await dispatch(cancelBorrow(borrowID));

      toast.warning("Borrow cancelled successfully");
      close();
      dispatch(borrowsList());
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
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          onClick={borrowConfirmation}
        >
          Yes, confirm
        </Button>
      </div>
    </div>
  );
}

export default EditBorrow;
