import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/users/usersThunks";
import UsersTable from "../../components/atoms/UsersTable";
import { Pagination } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import UsersSearchFilter from "../../components/molecules/UsersSearchFilter";
import DeleteUser from "../../components/molecules/DeleteUser";
import UpdateUser from "../../components/molecules/UpdateUser";
import { Button } from "flowbite-react";
import AddUser from "../../components/molecules/AddUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportUsers from "../../components/molecules/ImportUsers";
import { MdDisplaySettings } from "react-icons/md";
import ExportUsers from "../../components/molecules/ExportUsers";
// import { useDispatch,useSelector } from "react-redux";
function Users() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.users.totalPages);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getUsers({ page: currentPage }));
  }, [currentPage]);

  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);

  const close = () => {
    setOpenModal(false);
  };

  const modals = {
    updatePwd: <UpdateUser close={close} />,
    deleteUser: <DeleteUser close={close} />,
    addUser: <AddUser close={close} />,
    importUsers: <ImportUsers close={close} />,
    exportUsers: <ExportUsers close={close} />,
  };

  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
    
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <UsersSearchFilter />
        <div className="flex gap-8">
          <Button
            className="w-80 bg-black  hover:opacity-75 text-white"
            onClick={() => handleModal("addUser")}
          >
            Add User
          </Button>

          <Button
            className="w-80 bg-black  hover:opacity-75 text-white"
            onClick={() => handleModal("importUsers")}
          >
            Import Users
          </Button>
          <Button
            className="w-80 bg-black  hover:opacity-75 text-white"
            onClick={() => handleModal("exportUsers")}
          >
            Export Users
          </Button>
        </div>
      </div>

      <UsersTable
        editModal={() => handleModal("updatePwd")}
        deleteModal={() => handleModal("deleteUser")}
      />

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <ModalContainer
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      >
        {modals[modalForm]}
      </ModalContainer>

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

export default Users;
