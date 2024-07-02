import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/users/usersThunks";
import UsersTable from "../../components/atoms/UsersTable";
import { Pagination } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import UsersSearchFilter from "../../components/molecules/UsersSearchFilter";
import DeleteUser from "../../components/molecules/DeleteUser";
import UpdateUser from "../../components/molecules/UpdateUser";

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

  const modals = {
    updatePwd: <UpdateUser/>,
    deleteUser: <DeleteUser />,
  };
  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        <UsersSearchFilter />
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
    </div>
  );
}

export default Users;
