import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/users/usersThunks";
function DeleteUser() {
  const id = useSelector((state) => state.users.userID);
  const dispatch = useDispatch();

  const userDelete = async () => {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the user with ID: {id}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={userDelete}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

export default DeleteUser;
